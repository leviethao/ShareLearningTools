//========= THE SEARCH ENGINE VERSION 2 =========
/*Make by: Lê Việt Hào
*Development platform: Node.js
*Contact: https://www.facebook.com/leviethao.it97
*Ho Chi Minh city 06/09/2017
*/

//========= ALGORITHM DESCRIPTION =========
/*
* Use the structure {_id: number, strValue: string, score: number} to store the data
* Load data from the database (mongodb), convert data to table structure (self-defined structure),
* save table objects on global variables.
* Search for approximate strings based on the data of the global variables of the table
* Accuracy of approximate strings, saving the calculated results to the score of the object 
* containing the string, the higher the string, the higher the level of accuracy.
* Arrange approximate sequences in descending order of precision (score)
* The result returned is an array of objects that contain sorted sequences that reduce the precision
*/

//========= MÔ TẢ THUẬT TOÁN ==============
/*
*Sử dụng cấu trúc {_id: number, strValue: string, score: number} để lưu trữ dữ liệu
*Load dữ liệu từ database (mongodb), chuyển đổi dữ liệu sang cấu trúc table (cấu trúc 
*tự định nghĩa), lưu đối tượng table trên biến toàn cục
*Tìm kiếm các chuỗi gần đúng dựa trên dữ liệu của biến toàn cục table
*Tính độ chính xác cho các chuỗi gần đúng, lưu kết quả tính được vào thuộc tính score
*của đối tượng chứa chuỗi, chuỗi có score càng cao thì mức độ chính xác càng cao
*Sắp xếp các chuỗi gần đúng theo thứ tự giảm dần độ chính xác (score)
*Kết quả trả về là 1 mảng các đối tượng chứa chuỗi đã được sắp xếp giảm dần độ chính xác
*/


const Post = require('../models/post')
const Comment = require('../models/comment')
const PostCategory = require('../models/post_category')
const ToolCategory = require('../models/tool_category')
const User = require('../models/user')
const Reply = require('../models/reply')
const Exchange = require('../models/exchange')
const Notify = require('../models/notify')

var searchField = 'content'


//class Table
// A redesigned data type based on data from the database
//contain a object as {
//						keyword1: [{_id: x, strValue: y}, ...],
//						keyword2: [{_id: x, strValue: y}, ...],
//						keyword3: ...
//					  }
//Each strValue must contain at least 1 word of keyword
// Helps speed up the search string by only accessing the 
//keywords contained within the string to find

function Table() {
	this.data = {};
	this.add = function (key, val) {
		if (this.data[key] == undefined) {
			this.data[key] = [val];
		} 
		else {
			this.data[key].push(val);
		}
	}
}

//create the table object from data array of database
//the first parameter is data array of database
//the second parameter is callback function have 1 parameter
//is result (which contain Table created)
//no return value
function createTable(dataArr, callback) {
	if (dataArr == undefined) {
		return console.log(new Error("dataArr is undefined"));
	}
	
	var table = new Table();
	
	for (let obj of dataArr) {
		var wordArr = obj[searchField].split(" ");
		for (let word of wordArr) {
			table.add(word, obj);
		}
	}
	
	callback(table);
}

//search elements in the table that keyword match with words of the strSearch
//the first parameter is string search input
//the second parameter is the table input
//the third parameter is callback function that have 1 parameter 
//is result (the array of element that have matched keyword)
//no return value
function searchInTable(strSearch, table, callback) {
	//check valid
	if (strSearch == undefined) {
		return console.log(new Error("strSearch is undefined"));
	}
	if (table == undefined) {
		return console.log(new Error("table is undefined"));
	}
	
	var set = new Set(); //contain unique values
	var wordArr = strSearch.split(" ");
	
	//normalize words
	for (let i = 0; i < wordArr.length; i++) {
		wordArr[i] = wordArr[i].trim();
	}
	
	//add elements which matched keyword between strSearch and table to the set
	for (let word of wordArr) {
		if (table.data[word] != undefined) {
			for (let obj of table.data[word]) {
				set.add(obj);
			}	
		}
	}
	
	callback(Array.from(set)); //convert set to array
}


//load all data from database and convert it to array
//the first parameter is the name of collection that we want to load
//the second parameter is callback function that have 1 parameter
//is result (the array that converted from database)
//no return value
async function loadDatabase(callback) {
  await Post.find({enable: true})
  // .populate('poster')
  .populate('postCategory')
  .populate('toolCategory')
  .populate('comments')
  .exec((err, posts) => {
    if (err) {
      console.log(err)
      callback(null)
      return
    }
    callback(posts)
  })
}

//Compute the score of elements in data array, the score property represent the
//precision between it self and the string search
//The first parameter is string search input
//The second parameter is data array (that received from callback of searchInTable function)
//The last parameter is callback function that have 1 parameter is result (a array of elements 
//have sorted in decreasing order precision)
//no return value
function computeScoreAndSort(strSearch, dataArr, callback) {
	//check valid
	if (strSearch == undefined) {
		return console.log(new Error("strSearch is undefined"));
	}
	if (dataArr == undefined) {
		return console.log(new Error("dataArr is undefined"));
	}
	
	var wordArr = strSearch.split(" ");
	
	//normalize words
	for (let i = 0; i < wordArr.length; i++) {
		wordArr[i] = wordArr[i].trim();
	}
	
	//through all element in dataArr and mark it with a score that
	//represent the precision with string search
	for (let i = 0; i < dataArr.length; i++) {
		var keywords = dataArr[i][searchField].split(" ");
		var score = 0;
		for (let word of wordArr) {
			for (let key of keywords) {
				if (key == word) score += 1.5 * score + 1; //(ax + b) to ensure precision
			}											 //exp: string search is: "internet of things"
		}												 // then "internet of future" more accurate "internet"
		
		//divide the score by the length of string to ensure precision
		if (score > 0) {
			score /= dataArr[i][searchField].length;
		}
		
		dataArr[i].score = score;
	}
	
	//sort array that computed score in decreasing order of score
	dataArr.sort(function (a, b) {
		return b.score - a.score;
	});
	
	callback(dataArr);
}

//Find all elements that contain keywords in string search
//and sort it in decreasing order precision
//The first parameter is string search input
//The second parameter is table object input
//The last parameter is callback function have 1 parameter is
//result (the array elements has sorted in decreasing order precision)
//no return value
function search(strSearch, table, callback) {
	//check valid
	if (strSearch == undefined) {
		return console.log(new Error("strSearch is undefined"));
	}
	if (table == undefined) {
		return console.log(new Error("table is undefined"));
	}
	
	searchInTable(strSearch, table, function (res) {
		computeScoreAndSort(strSearch, res, function (res) {
			callback(res);
		});
	});
}
	
	
//================= MAIN PROGRAM ================
		
//load database to table and store in global variable, It exists throughout the program
var table;
loadDatabase(function (res) {
	createTable(res, function (res) {
		table = res;
	});
});

//=======================
	

// export
module.exports = {
  searchPosts (req, res) {
    search(req.params.searchStr, table, function (posts) {
      res.send({posts: posts})
    })
  }
}
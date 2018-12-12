/*==============================================================*/
/* DBMS name:      Microsoft SQL Server 2008                    */
/* Created on:     12/6/2018 10:43:05 AM                        */
/*==============================================================*/


if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('COMMENT') and o.name = 'FK_COMMENT_FK_COMMEN_USER')
alter table COMMENT
   drop constraint FK_COMMENT_FK_COMMEN_USER
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('COMMENT') and o.name = 'FK_COMMENT_FK_POST_C_POST')
alter table COMMENT
   drop constraint FK_COMMENT_FK_POST_C_POST
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('EVENT') and o.name = 'FK_EVENT_FK_ADMIN_USER')
alter table EVENT
   drop constraint FK_EVENT_FK_ADMIN_USER
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('EXCHANGE') and o.name = 'FK_EXCHANGE_FK_POST_E_POST')
alter table EXCHANGE
   drop constraint FK_EXCHANGE_FK_POST_E_POST
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('EXCHANGE') and o.name = 'FK_EXCHANGE_FK_PROVID_USER')
alter table EXCHANGE
   drop constraint FK_EXCHANGE_FK_PROVID_USER
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('EXCHANGE') and o.name = 'FK_EXCHANGE_FK_RECEIV_USER')
alter table EXCHANGE
   drop constraint FK_EXCHANGE_FK_RECEIV_USER
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NOTIFY') and o.name = 'FK_NOTIFY_FK_NOTIFY_NOTIFYST')
alter table NOTIFY
   drop constraint FK_NOTIFY_FK_NOTIFY_NOTIFYST
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NOTIFY') and o.name = 'FK_NOTIFY_FK_USER_N_USER')
alter table NOTIFY
   drop constraint FK_NOTIFY_FK_USER_N_USER
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('POST') and o.name = 'FK_POST_FK_POSTER_USER')
alter table POST
   drop constraint FK_POST_FK_POSTER_USER
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('POST') and o.name = 'FK_POST_FK_POST_C_POSTCATE')
alter table POST
   drop constraint FK_POST_FK_POST_C_POSTCATE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('POST') and o.name = 'FK_POST_FK_TOOL_C_TOOLCATE')
alter table POST
   drop constraint FK_POST_FK_TOOL_C_TOOLCATE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('POSTFILENAME') and o.name = 'FK_POSTFILE_FK_POST_POST')
alter table POSTFILENAME
   drop constraint FK_POSTFILE_FK_POST_POST
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('REPLY') and o.name = 'FK_REPLY_FK_COMMEN_COMMENT')
alter table REPLY
   drop constraint FK_REPLY_FK_COMMEN_COMMENT
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('REPLY') and o.name = 'FK_REPLY_FK_REPLYE_USER')
alter table REPLY
   drop constraint FK_REPLY_FK_REPLYE_USER
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('SEARCH') and o.name = 'FK_SEARCH_FK_USER_S_USER')
alter table SEARCH
   drop constraint FK_SEARCH_FK_USER_S_USER
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('SEARCHRESULT') and o.name = 'FK_SEARCHRE_SEARCHRES_SEARCH')
alter table SEARCHRESULT
   drop constraint FK_SEARCHRE_SEARCHRES_SEARCH
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('SEARCHRESULT') and o.name = 'FK_SEARCHRE_SEARCHRES_POST')
alter table SEARCHRESULT
   drop constraint FK_SEARCHRE_SEARCHRES_POST
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('"USER"') and o.name = 'FK_USER_FK_USER_G_GENDER')
alter table "USER"
   drop constraint FK_USER_FK_USER_G_GENDER
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('"USER"') and o.name = 'FK_USER_FK_USER_R_RIGHT')
alter table "USER"
   drop constraint FK_USER_FK_USER_R_RIGHT
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('COMMENT')
            and   name  = 'FK_POST_COMMENT_FK'
            and   indid > 0
            and   indid < 255)
   drop index COMMENT.FK_POST_COMMENT_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('COMMENT')
            and   name  = 'FK_COMMENTER_FK'
            and   indid > 0
            and   indid < 255)
   drop index COMMENT.FK_COMMENTER_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('COMMENT')
            and   type = 'U')
   drop table COMMENT
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('EVENT')
            and   name  = 'FK_ADMIN_FK'
            and   indid > 0
            and   indid < 255)
   drop index EVENT.FK_ADMIN_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('EVENT')
            and   type = 'U')
   drop table EVENT
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('EXCHANGE')
            and   name  = 'FK_RECEIVER_FK'
            and   indid > 0
            and   indid < 255)
   drop index EXCHANGE.FK_RECEIVER_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('EXCHANGE')
            and   name  = 'FK_PROVIDER_FK'
            and   indid > 0
            and   indid < 255)
   drop index EXCHANGE.FK_PROVIDER_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('EXCHANGE')
            and   name  = 'FK_POST_EXCHANGE_FK'
            and   indid > 0
            and   indid < 255)
   drop index EXCHANGE.FK_POST_EXCHANGE_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('EXCHANGE')
            and   type = 'U')
   drop table EXCHANGE
go

if exists (select 1
            from  sysobjects
           where  id = object_id('GENDER')
            and   type = 'U')
   drop table GENDER
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NOTIFY')
            and   name  = 'FK_NOTIFY_STATUS_FK'
            and   indid > 0
            and   indid < 255)
   drop index NOTIFY.FK_NOTIFY_STATUS_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NOTIFY')
            and   name  = 'FK_USER_NOTIFY_FK'
            and   indid > 0
            and   indid < 255)
   drop index NOTIFY.FK_USER_NOTIFY_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NOTIFY')
            and   type = 'U')
   drop table NOTIFY
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NOTIFYSTATUS')
            and   type = 'U')
   drop table NOTIFYSTATUS
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('POST')
            and   name  = 'FK_TOOL_CATEGORY_FK'
            and   indid > 0
            and   indid < 255)
   drop index POST.FK_TOOL_CATEGORY_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('POST')
            and   name  = 'FK_POST_CATEGORY_FK'
            and   indid > 0
            and   indid < 255)
   drop index POST.FK_POST_CATEGORY_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('POST')
            and   name  = 'FK_POSTER_FK'
            and   indid > 0
            and   indid < 255)
   drop index POST.FK_POSTER_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('POST')
            and   type = 'U')
   drop table POST
go

if exists (select 1
            from  sysobjects
           where  id = object_id('POSTCATEGORY')
            and   type = 'U')
   drop table POSTCATEGORY
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('POSTFILENAME')
            and   name  = 'FK_POST_FK'
            and   indid > 0
            and   indid < 255)
   drop index POSTFILENAME.FK_POST_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('POSTFILENAME')
            and   type = 'U')
   drop table POSTFILENAME
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('REPLY')
            and   name  = 'FK_COMMENT_REPLY_FK'
            and   indid > 0
            and   indid < 255)
   drop index REPLY.FK_COMMENT_REPLY_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('REPLY')
            and   name  = 'FK_REPLYER_FK'
            and   indid > 0
            and   indid < 255)
   drop index REPLY.FK_REPLYER_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('REPLY')
            and   type = 'U')
   drop table REPLY
go

if exists (select 1
            from  sysobjects
           where  id = object_id('"RIGHT"')
            and   type = 'U')
   drop table "RIGHT"
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('SEARCH')
            and   name  = 'FK_USER_SEARCH_FK'
            and   indid > 0
            and   indid < 255)
   drop index SEARCH.FK_USER_SEARCH_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('SEARCH')
            and   type = 'U')
   drop table SEARCH
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('SEARCHRESULT')
            and   name  = 'SEARCHRESULT2_FK'
            and   indid > 0
            and   indid < 255)
   drop index SEARCHRESULT.SEARCHRESULT2_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('SEARCHRESULT')
            and   name  = 'SEARCHRESULT_FK'
            and   indid > 0
            and   indid < 255)
   drop index SEARCHRESULT.SEARCHRESULT_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('SEARCHRESULT')
            and   type = 'U')
   drop table SEARCHRESULT
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TOOLCATEGORY')
            and   type = 'U')
   drop table TOOLCATEGORY
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('"USER"')
            and   name  = 'FK_USER_RIGHT_FK'
            and   indid > 0
            and   indid < 255)
   drop index "USER".FK_USER_RIGHT_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('"USER"')
            and   name  = 'FK_USER_GENDER_FK'
            and   indid > 0
            and   indid < 255)
   drop index "USER".FK_USER_GENDER_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('"USER"')
            and   type = 'U')
   drop table "USER"
go

/*==============================================================*/
/* Table: COMMENT                                               */
/*==============================================================*/
create table COMMENT (
   ID                   varchar(1024)        not null,
   USE_ID               varchar(1024)        null,
   POS_ID               varchar(1024)        null,
   CREATED              datetime             null,
   CONTENT              varchar(1024)        null,
   constraint PK_COMMENT primary key nonclustered (ID)
)
go

/*==============================================================*/
/* Index: FK_COMMENTER_FK                                       */
/*==============================================================*/
create index FK_COMMENTER_FK on COMMENT (
USE_ID ASC
)
go

/*==============================================================*/
/* Index: FK_POST_COMMENT_FK                                    */
/*==============================================================*/
create index FK_POST_COMMENT_FK on COMMENT (
POS_ID ASC
)
go

/*==============================================================*/
/* Table: EVENT                                                 */
/*==============================================================*/
create table EVENT (
   ID                   varchar(1024)        not null,
   USE_ID               varchar(1024)        null,
   CREATED              datetime             null,
   CONTENT              varchar(1024)        null,
   constraint PK_EVENT primary key nonclustered (ID)
)
go

/*==============================================================*/
/* Index: FK_ADMIN_FK                                           */
/*==============================================================*/
create index FK_ADMIN_FK on EVENT (
USE_ID ASC
)
go

/*==============================================================*/
/* Table: EXCHANGE                                              */
/*==============================================================*/
create table EXCHANGE (
   ID                   varchar(1024)        not null,
   POS_ID               varchar(1024)        null,
   USE_ID               varchar(1024)        null,
   USE_ID2              varchar(1024)        null,
   DATE                 datetime             null,
   constraint PK_EXCHANGE primary key nonclustered (ID)
)
go

/*==============================================================*/
/* Index: FK_POST_EXCHANGE_FK                                   */
/*==============================================================*/
create index FK_POST_EXCHANGE_FK on EXCHANGE (
POS_ID ASC
)
go

/*==============================================================*/
/* Index: FK_PROVIDER_FK                                        */
/*==============================================================*/
create index FK_PROVIDER_FK on EXCHANGE (
USE_ID ASC
)
go

/*==============================================================*/
/* Index: FK_RECEIVER_FK                                        */
/*==============================================================*/
create index FK_RECEIVER_FK on EXCHANGE (
USE_ID2 ASC
)
go

/*==============================================================*/
/* Table: GENDER                                                */
/*==============================================================*/
create table GENDER (
   ID2                  varchar(1024)        not null,
   NAME                 varchar(1024)        null,
   constraint PK_GENDER primary key nonclustered (ID2)
)
go

/*==============================================================*/
/* Table: NOTIFY                                                */
/*==============================================================*/
create table NOTIFY (
   ID                   varchar(1024)        not null,
   NOT_ID               varchar(1024)        null,
   USE_ID               varchar(1024)        null,
   CREATED              datetime             null,
   CONTENT              varchar(1024)        null,
   LINK                 varchar(1024)        null,
   constraint PK_NOTIFY primary key nonclustered (ID)
)
go

/*==============================================================*/
/* Index: FK_USER_NOTIFY_FK                                     */
/*==============================================================*/
create index FK_USER_NOTIFY_FK on NOTIFY (
USE_ID ASC
)
go

/*==============================================================*/
/* Index: FK_NOTIFY_STATUS_FK                                   */
/*==============================================================*/
create index FK_NOTIFY_STATUS_FK on NOTIFY (
NOT_ID ASC
)
go

/*==============================================================*/
/* Table: NOTIFYSTATUS                                          */
/*==============================================================*/
create table NOTIFYSTATUS (
   ID                   varchar(1024)        not null,
   NAME                 varchar(1024)        null,
   constraint PK_NOTIFYSTATUS primary key nonclustered (ID)
)
go

/*==============================================================*/
/* Table: POST                                                  */
/*==============================================================*/
create table POST (
   ID                   varchar(1024)        not null,
   POS_ID               varchar(1024)        null,
   TOO_ID               varchar(1024)        null,
   USE_ID               varchar(1024)        null,
   CREATED              datetime             null,
   CONTENT              varchar(1024)        null,
   EXCHANGECONDITION    varchar(1024)        null,
   ENABLE               bit                  null,
   constraint PK_POST primary key nonclustered (ID)
)
go

/*==============================================================*/
/* Index: FK_POSTER_FK                                          */
/*==============================================================*/
create index FK_POSTER_FK on POST (
USE_ID ASC
)
go

/*==============================================================*/
/* Index: FK_POST_CATEGORY_FK                                   */
/*==============================================================*/
create index FK_POST_CATEGORY_FK on POST (
POS_ID ASC
)
go

/*==============================================================*/
/* Index: FK_TOOL_CATEGORY_FK                                   */
/*==============================================================*/
create index FK_TOOL_CATEGORY_FK on POST (
TOO_ID ASC
)
go

/*==============================================================*/
/* Table: POSTCATEGORY                                          */
/*==============================================================*/
create table POSTCATEGORY (
   ID                   varchar(1024)        not null,
   NAME                 varchar(1024)        null,
   constraint PK_POSTCATEGORY primary key nonclustered (ID)
)
go

/*==============================================================*/
/* Table: POSTFILENAME                                          */
/*==============================================================*/
create table POSTFILENAME (
   ID                   varchar(1024)        not null,
   POS_ID               varchar(1024)        null,
   FILENAME             varchar(1024)        null,
   constraint PK_POSTFILENAME primary key nonclustered (ID)
)
go

/*==============================================================*/
/* Index: FK_POST_FK                                            */
/*==============================================================*/
create index FK_POST_FK on POSTFILENAME (
POS_ID ASC
)
go

/*==============================================================*/
/* Table: REPLY                                                 */
/*==============================================================*/
create table REPLY (
   ID                   varchar(1024)        not null,
   COM_ID               varchar(1024)        null,
   USE_ID               varchar(1024)        null,
   CREATED              datetime             null,
   CONTENT              varchar(1024)        null,
   constraint PK_REPLY primary key nonclustered (ID)
)
go

/*==============================================================*/
/* Index: FK_REPLYER_FK                                         */
/*==============================================================*/
create index FK_REPLYER_FK on REPLY (
USE_ID ASC
)
go

/*==============================================================*/
/* Index: FK_COMMENT_REPLY_FK                                   */
/*==============================================================*/
create index FK_COMMENT_REPLY_FK on REPLY (
COM_ID ASC
)
go

/*==============================================================*/
/* Table: "RIGHT"                                               */
/*==============================================================*/
create table "RIGHT" (
   ID                   varchar(1024)        not null,
   NAME                 varchar(1024)        null,
   constraint PK_RIGHT primary key nonclustered (ID)
)
go

/*==============================================================*/
/* Table: SEARCH                                                */
/*==============================================================*/
create table SEARCH (
   ID                   varchar(1024)        not null,
   USE_ID               varchar(1024)        null,
   CREATED              datetime             null,
   CONTENT              varchar(1024)        null,
   constraint PK_SEARCH primary key nonclustered (ID)
)
go

/*==============================================================*/
/* Index: FK_USER_SEARCH_FK                                     */
/*==============================================================*/
create index FK_USER_SEARCH_FK on SEARCH (
USE_ID ASC
)
go

/*==============================================================*/
/* Table: SEARCHRESULT                                          */
/*==============================================================*/
create table SEARCHRESULT (
   SEA_ID               varchar(1024)        not null,
   ID                   varchar(1024)        not null,
   constraint PK_SEARCHRESULT primary key (SEA_ID, ID)
)
go

/*==============================================================*/
/* Index: SEARCHRESULT_FK                                       */
/*==============================================================*/
create index SEARCHRESULT_FK on SEARCHRESULT (
SEA_ID ASC
)
go

/*==============================================================*/
/* Index: SEARCHRESULT2_FK                                      */
/*==============================================================*/
create index SEARCHRESULT2_FK on SEARCHRESULT (
ID ASC
)
go

/*==============================================================*/
/* Table: TOOLCATEGORY                                          */
/*==============================================================*/
create table TOOLCATEGORY (
   ID                   varchar(1024)        not null,
   NAME                 varchar(1024)        null,
   constraint PK_TOOLCATEGORY primary key nonclustered (ID)
)
go

/*==============================================================*/
/* Table: "USER"                                                */
/*==============================================================*/
create table "USER" (
   ID                   varchar(1024)        not null,
   RIG_ID               varchar(1024)        null,
   ID2                  varchar(1024)        null,
   LOGINNAME            varchar(1024)        null,
   PASSWORD             varchar(1024)        null,
   NAME                 varchar(1024)        null,
   AVATAR               varchar(1024)        null,
   DATEOFBIRTH          datetime             null,
   ADDRESS              varchar(1024)        null,
   PHONENUMBER          varchar(11)          null,
   constraint PK_USER primary key nonclustered (ID)
)
go

/*==============================================================*/
/* Index: FK_USER_GENDER_FK                                     */
/*==============================================================*/
create index FK_USER_GENDER_FK on "USER" (
ID2 ASC
)
go

/*==============================================================*/
/* Index: FK_USER_RIGHT_FK                                      */
/*==============================================================*/
create index FK_USER_RIGHT_FK on "USER" (
RIG_ID ASC
)
go

alter table COMMENT
   add constraint FK_COMMENT_FK_COMMEN_USER foreign key (USE_ID)
      references "USER" (ID)
go

alter table COMMENT
   add constraint FK_COMMENT_FK_POST_C_POST foreign key (POS_ID)
      references POST (ID)
go

alter table EVENT
   add constraint FK_EVENT_FK_ADMIN_USER foreign key (USE_ID)
      references "USER" (ID)
go

alter table EXCHANGE
   add constraint FK_EXCHANGE_FK_POST_E_POST foreign key (POS_ID)
      references POST (ID)
go

alter table EXCHANGE
   add constraint FK_EXCHANGE_FK_PROVID_USER foreign key (USE_ID)
      references "USER" (ID)
go

alter table EXCHANGE
   add constraint FK_EXCHANGE_FK_RECEIV_USER foreign key (USE_ID2)
      references "USER" (ID)
go

alter table NOTIFY
   add constraint FK_NOTIFY_FK_NOTIFY_NOTIFYST foreign key (NOT_ID)
      references NOTIFYSTATUS (ID)
go

alter table NOTIFY
   add constraint FK_NOTIFY_FK_USER_N_USER foreign key (USE_ID)
      references "USER" (ID)
go

alter table POST
   add constraint FK_POST_FK_POSTER_USER foreign key (USE_ID)
      references "USER" (ID)
go

alter table POST
   add constraint FK_POST_FK_POST_C_POSTCATE foreign key (POS_ID)
      references POSTCATEGORY (ID)
go

alter table POST
   add constraint FK_POST_FK_TOOL_C_TOOLCATE foreign key (TOO_ID)
      references TOOLCATEGORY (ID)
go

alter table POSTFILENAME
   add constraint FK_POSTFILE_FK_POST_POST foreign key (POS_ID)
      references POST (ID)
go

alter table REPLY
   add constraint FK_REPLY_FK_COMMEN_COMMENT foreign key (COM_ID)
      references COMMENT (ID)
go

alter table REPLY
   add constraint FK_REPLY_FK_REPLYE_USER foreign key (USE_ID)
      references "USER" (ID)
go

alter table SEARCH
   add constraint FK_SEARCH_FK_USER_S_USER foreign key (USE_ID)
      references "USER" (ID)
go

alter table SEARCHRESULT
   add constraint FK_SEARCHRE_SEARCHRES_SEARCH foreign key (SEA_ID)
      references SEARCH (ID)
go

alter table SEARCHRESULT
   add constraint FK_SEARCHRE_SEARCHRES_POST foreign key (ID)
      references POST (ID)
go

alter table "USER"
   add constraint FK_USER_FK_USER_G_GENDER foreign key (ID2)
      references GENDER (ID2)
go

alter table "USER"
   add constraint FK_USER_FK_USER_R_RIGHT foreign key (RIG_ID)
      references "RIGHT" (ID)
go


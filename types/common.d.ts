declare const md5: any
type url = string
type link = string
type base64 = string
type DateString = string

type GlobalProvide = {
  lc : AV.Object
}

type LCBase = {
  createdAt: DateString
  updatedAt: DateString
  objectId: string
}

type BaseObject = {
  [key : string] : any
}

type BaseDomObject = {
  [key : string] : HTMLElement
}

type Function = {
  before(fn : any) : void,
  after(fn : any) : void,
}

type LCRequest = {
  params : any,
  currentUser : any,
  expressReq : any,
  params : any,
  object : any,
  meta : any,
  user : any,
  currentUser : any,
  sessionToken,
}

type LCResponse = {
  code : number,
  msg : string,
  data : any,
  error ?: any,
}

type LCAuthData = {
  uid ?: string
  openid : string
}

type LCError = Error & {
  rawMessage : string,
}

// type LCQuery = {
//   notEqualTo(field : string, value : any) : void
//   limit(num : number) : void,
//   skip(num : number) : void,
//   equalTo(field : string, value : any) : void,
//   greaterThan(field : string, value : any) : void
//   lessThan(field : string, value : any) : void
//   descending(field : string) : void,
//   ascending(field : string) : void,
//   include(field : string) : void
//   notContainedIn(field : string, value : any) : void
//   addDescending(field : string) : void
//   notContainedIn(field : string, array : string[]) : void
//   near(field : string, point : any) : void
// }

type LCRuleResponse = {
  code : number,
  msg : string,
  error ?: Error | string,
  data ?: Object | string
}

type QRItem = {
  image : string, // 图片
  description : string, // 描述
  avatar ?: string, // 头像
  contacts ?: string[],
  cover ?: string, // 背景图
}

type DetailEvent = {
  detail : BaseObject
}
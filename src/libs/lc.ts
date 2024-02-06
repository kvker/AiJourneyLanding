import AV from 'leancloud-storage'

if (!(AV.applicationId && AV.applicationKey)) {
  AV.init({
    appId: '4GOlv4BZHsvjPc5qyB9QSvku-gzGzoHsz',
    appKey: 'a1AQ3HHUkZyw7aB3lyvdo8zs',
    serverURL: 'https://aiguidelcapi.ilovecats.cn'
  })
}

const isDev = process.env.NODE_ENV === 'development'
console.log({ isDev })
// isDev && console.log('调用的是测试环境云函数')
AV.setProduction(true || !isDev)

type LCQueryCallback = (q: AV.Query<AV.Queriable>) => AV.Query<AV.Object> | void

const lc = {
  AV,
  /**
   * 批量创建
   * @param {array} objects
   */
  createAll(objects: AV.Object[]): Promise<(AV.Object | AV.Error)[]> {
    return AV.Object.saveAll(objects)
  },
  /**
   * 批量删除
   * @param {array} objects
   */
  deleteAll(objects: AV.Object[]): Promise<(void | AV.Error)[]> {
    return AV.Object.destroyAll(objects)
  },
  /**
   * 批量更新
   * @param {array} objects
   */
  updateAll(objects: AV.Object[]): Promise<(AV.Object | AV.Error)[]> {
    return AV.Object.fetchAll(objects)
  },
  /**
   * 批量保存
   * @param {array} objects
   */
  saveAll(objects: AV.Object[]): Promise<(AV.Object | AV.Error)[]> {
    return AV.Object.saveAll(objects)
  },
  /**
   * av新增对象
   * @param {string} classs 新增对象的类
   * @param {object} params 新增参数
   */
  create(classs: string, params: BaseObject): Promise<AV.Object> {
    return (new (AV.Object.extend(classs))).set(params).save()
  },
  createObject(classs: string, id: string): AV.Object {
    return AV.Object.createWithoutData(classs, id)
  },
  queryHandler(classs: string, cbForQuery?: LCQueryCallback) {
    let query = new AV.Query(classs)
    // 如果需要额外设置条件，则通过传入这个函数处理
    if (cbForQuery) {
      // 如果是组合搜索，替换处理
      const temp_q = cbForQuery(query)
      if (temp_q) {
        query = temp_q
      }
    }
    return query
  },
  /**
   * av基础获取
   * @param {string} classs 搜索类名
   * @param {function} cbForQuery 设置查询条件的中介函数
   */
  read(classs: string, cbForQuery?: LCQueryCallback): Promise<AV.Queriable[]> {
    return this.queryHandler(classs, cbForQuery).find()
  },
  query(classs: string, cbForQuery?: LCQueryCallback): Promise<AV.Queriable[]> {
    return this.read(classs, cbForQuery)
  },
  one(classs: string, cbForQuery?: LCQueryCallback): Promise<AV.Queriable | undefined> {
    return this.queryHandler(classs, cbForQuery).first()
  },
  /**
   * av更新对象
   * @param {string} classs 更新对象的类
   * @param {string} id 更新对象的objectId
   * @param {object} params 更新内容
   */
  update(classs: string, id: string, params: BaseObject): Promise<AV.Object> {
    const obj = AV.Object.createWithoutData(classs, id)
    // 设置属性
    for (const key in params) {
      const element = params[key]
      obj.set(key, element)
    }
    return obj.save()
  },
  /**
   * av删除对象
   * @param {string} classs 删除对象的类
   * @param {string} id 删除对象的objectId
   */
  delete(classs: string, id: string) {
    const obj = AV.Object.createWithoutData(classs, id)
    return obj.destroy()
  },
  /**
   * 上传资源文件
   * @param {string} pat 文件路径
   */
  upload(base64: string, filename = new Date().getTime() / 1000 + '.png'): Promise<AV.File> {
    return new AV.File(filename, {
      base64,
    }).save()
  },
  /**
   * 上传小程序资源文件
   * @param {string} pat 文件路径
   */
  uploadMpFile(path: string): Promise<AV.File> {
    return new AV.File(path, {
      blob: {
        uri: path,
      },
    }).save()
  },
  /**
   * 上传资源文件
   * @param {string} pat 文件路径
   */
  uploadBase64(base64: string, file_name: string): Promise<AV.File> {
    return this.upload(base64, file_name)
  },
  uploadFile(file: File, file_name = new Date().getTime() / 1000 + '.png'): Promise<AV.File> {
    return new AV.File(file_name, file).save()
  },
  /**
   * av基础获取数量
   * @param {string} classs 搜索类名
   * @param {function} cbForQuery 设置查询条件的中介函数
   */
  count(classs: string, cbForQuery?: LCQueryCallback): Promise<number> {
    const query = new AV.Query(classs)
    // 如果需要额外设置条件，则通过传入这个函数处理
    if (cbForQuery) {
      cbForQuery(query)
    }
    return query.count()
  },
  /**
   * 登录
   */
  login(username: string, password: string): Promise<AV.User> {
    return AV.User.logIn(username, password)
  },
  loginWithPhone(phone: string, password: string): Promise<AV.User> {
    return AV.User.logInWithMobilePhone(phone, password)
  },
  loginWithWeChat(): Promise<AV.User> {
    return AV.User.loginWithMiniApp()
  },
  /**
   * 退出
   */
  logout(): void {
    this.AV.User.logOut()
  },
  /**
   * 注册
   */
  regist(username: string, password: string): Promise<AV.User> {
    // 创建实例
    const user = new AV.User()

    // 等同于 user.set('username', 'Tom')
    user.setUsername(username)
    user.setPassword(password)
    return user.signUp()
  },
  /**
   * 获取当前用户
   */
  currentUser(): AV.User {
    return AV.User.current()
  },
  become(sessionToken: string): Promise<AV.User> {
    return AV.User.become(sessionToken)
  },
  /**
   * 如果没有返回值，则意味着进入了非code = 0状态的bug
   */
  async run(name: string, data: BaseObject, needSource?: boolean): Promise<BaseObject> {
    let ret = await AV.Cloud.run(name, data)
    if (needSource) return ret
    else return ret.data
  }
}

export default lc

export type LC = typeof lc
const md5 = require('md5');
const UserModel = require('../../models/user/user.model');

class UserController {

    // 用户注册
    static async register(ctx) {
        const {username, password, password2} = ctx.request.body;
        if (!username || !password) {
            return ctx.body = {message: '用户名或密码不能为空!', code: 400}
        }
        if (password != password2) {
            return ctx.body = {message: '两次输入的密码不一致!', code: 400}
        }
        const ishas = await UserModel.findOne({username});
        if (ishas) {
            return ctx.body = {message: '该用户已存在!', code: 400}
        }
        const result = await UserModel.create({username, password: md5(password)});
        if (result) return ctx.body = {code: 200 }
        else ctx.body = {data: result, code: 400}
    }

    // 用户登录
    static async login(ctx) {
        const {username, password} = ctx.request.body;
        if (!username || !password) {
            return ctx.body = {message: '用户名或密码不能为空!', code: 400}
        }

        var ret = await UserModel.findOne({username, password: md5(password)}, {password: 0});
        if (!ret) return ctx.body = {message: '用户名不存在或密码错误!', code: 400}

        ctx.session.user = ret;
        const id = ret._id;
        const avatar = ret.avatar;
        const keep_user = 604800000; // 7天

        ctx.cookies.set('logged', true, {maxAge: keep_user, httpOnly: false});
        ctx.cookies.set('userid', id, {maxAge: keep_user, httpOnly: false});
        ctx.cookies.set('username', username, {maxAge: keep_user, httpOnly: false});
        ctx.cookies.set('avatar', avatar, {maxAge: keep_user, httpOnly: false});
        return ctx.body = {code: 200, data: ret}
    }

    // 用户退出
    static async logout(ctx) {
        const {userid} = ctx.query;
        const cookie_userid = ctx.cookies.get('userid');
        if (!userid) return ctx.error({msg: '用户id不存在!'});

        const user = ctx.session.user;
        if (!user && !cookie_userid) return ctx.error({msg: '该用户已退出!'});

        ctx.session.user = null;
        ctx.cookies.set('userid', null);
        ctx.cookies.set('username', null);
        ctx.cookies.set('avatar', null);

        return ctx.success({msg: '退出成功!'});
    }

    // 用户个人中心数据加载
    static async personal(ctx) {
        let {id, pageSize, current} = ctx.query;
        if (!id) return ctx.error({msg: '用户id不能为空'});

        const user = await UserModel.findById(id).select({password: 0});
        if (!user) return ctx.error({msg: '该用户不存在!'});

        if (!current) current = 1;
        if (!pageSize) pageSize = 10;
        const skip = (Number(current) - 1) * Number(pageSize);

        const totals = await ArticleModel.find({author: id}).count();
        const articles = await ArticleModel
            .find({author: id})
            .sort({createdAt: -1})
            .skip(Number(skip))
            .limit(Number(pageSize));

        return ctx.success({
            data: {
                user, articles, current, totals
            }
        });
    }

    // 更新用户个人信息
    static async put_userinfo(ctx) {
        const fields = ctx.request.body;
        if (!fields.id) return ctx.error({msg: '用户id不存在!'});

        const id = fields.id;
        delete fields.id;
        const result = await UserModel.findByIdAndUpdate(id, fields);
        if (!result) return ctx.error({msg: '更新失败!'});

        const user = await UserModel.findById(id).select({password: 0});
        if (!user) return ctx.error({msg: '返回用户失败!'});
        return ctx.success({msg: '修改成功', data: {user}});
    }

    // 上传用户头像
    /*
     * 上传逻辑由中间件 /rest/middlewares/upload 统一处理
     * 此处只需处理上传的结果
     */
    static async put_avatar(ctx) {
        const {url, id} = ctx.upload;
        if (!url) return ctx.error({msg: '上传失败!'});
        const updateavatar = await UserModel.findByIdAndUpdate(id, {avatar: url});
        return ctx.success({msg: '上传成功!', data: {url, id}});
    }

}
module.exports = UserController;




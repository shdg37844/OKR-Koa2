const userModel = require('../models/users')
const User = new userModel()
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const axios = require('axios');
const WECHAT_APPID = process.env.WECHAT_APPID;
const WECHAT_SECRET = process.env.WECHAT_SECRET;

const usersController = {
    login: async function (ctx, next) {
        const { code } = ctx.request.body;

        try {
            const wxResponse = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${WECHAT_APPID}&secret=${WECHAT_SECRET}&js_code=${code}&grant_type=authorization_code`);
            const { openid, session_key } = wxResponse.data;

            if (!openid || !session_key) {
                ctx.status = 400;
                ctx.body = { error: '微信登录失败' };
                return;
            }

            //查询用户是否是之前登录过的（是否在数据库里有openid）
            let user = await User.select({ openid: openid });
            if (!user.length) {
                const insertResult = await User.insert({ openid: openid });
                user = await User.select({ id: insertResult[0] }); // 获取插入的用户数据
            } else {
                user = user[0]; // 如果查询到用户，确保使用数组中的第一个元素
            }

            const encryptedUserId = jwt.sign({ user_id: user.id }, JWT_SECRET, { expiresIn: '2h' });  //根据用户的信息利用JWT生成token，下发给微信小程序
            ctx.body = { token: encryptedUserId };

        } catch (error) {
            console.error('登录错误:', error);
            ctx.status = 500;
            ctx.body = { error: '服务器错误' };
        }
    }
}

module.exports = usersController;


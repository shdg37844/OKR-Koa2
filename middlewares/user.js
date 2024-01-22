const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = {
    checkToken: async (ctx, next) => {
        console.log('开始运行')
        const authHeader = ctx.headers['authorization']; // 从 'authorization' 头部获取
        console.log('Headers:', ctx.headers); // 打印所有请求头信息
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.slice(7); // 提取 token
            console.log('Received token:', token); 
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                ctx.state.user_id = decoded.user_id;
                await next();
            } catch (err) {
                console.error('Token verification error:', err); 
                ctx.status = 401;
                ctx.body = { error: '无效的 token' };
            }
        } else {
            ctx.status = 401;
            ctx.body = { error: '没有提供 token' };
        }
    }
};

module.exports = authMiddleware;



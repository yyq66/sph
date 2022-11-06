<template>
    <div class="register-container">
        <!-- 注册内容 -->
        <div class="register">
            <h3>注册新用户
                <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
                </span>
            </h3>
            <div class="content">
                <label>手机号:</label>
                <input v-model="phone"
                    placeholder="请输入你的手机号"
                    name="phone"
                    v-validate="{ required:true,regex:/^1[1-9]\d{9}$/}"
                    :class="{ invalid:errors.has('phone')}"
                >
                <span class="error-msg">{{errors.first("phone")}}</span>
            </div>
            <div class="content">
                <label>验证码:</label>
                <input v-model="code"
                    placeholder="请输入验证码"
                    name="code"
                    v-validate="{ required:true,regex:/^\d{6}$/}"
                    :class="{ invalid:errors.has('code')}"
                >
                <!-- <img ref="code" src="http://182.92.128.115/api/user/passport/code" alt="code"> -->
                <button style="width:100px;height:38px;margin-left:5px;" @click="getRegisterCode">获取验证码</button>
                <span class="error-msg">{{errors.first("code")}}</span>
            </div>
            <div class="content">
                <label>登录密码:</label>
                <input v-model="password"
                    placeholder="请输入你的密码"
                    name="password"
                    v-validate="{ required:true,regex:/^[0-9a-zA-Z]{8,20}$/}"
                    :class="{ invalid:errors.has('password')}"
                >
                <span class="error-msg">{{errors.first("password")}}</span>
            </div>
            <div class="content">
                <label>确认密码:</label>
                <input v-model="password2"
                    placeholder="请再次输入你的密码"
                    name="password2"
                    v-validate="{ required:true,is:password}"
                    :class="{ invalid:errors.has('password2')}"
                >
                <span class="error-msg">{{errors.first("password2")}}</span>

            </div>
            <div class="controls">
                <input :checked="isAgree"
                    type="checkbox"
                    name="isAgree"
                    v-validate="{ required:true,tongyi:true}"
                    :class="{ invalid:errors.has('isAgree')}"
                >
                <span>同意协议并注册《尚品汇用户协议》</span>
                <span class="error-msg">{{errors.first("isAgree")}}</span>
            </div>
            <div class="btn">
                <button @click="userRegister">完成注册</button>
            </div>
        </div>

        <!-- 底部 -->
        <div class="copyright">
            <ul>
                <li>关于我们</li>
                <li>联系我们</li>
                <li>联系客服</li>
                <li>商家入驻</li>
                <li>营销中心</li>
                <li>手机尚品汇</li>
                <li>销售联盟</li>
                <li>尚品汇社区</li>
            </ul>
            <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
            <div class="beian">京ICP备19006430号
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            // 收集表单数据
            phone: "",
            // 验证码
            code: "",
            password:"",
            password2:"",
            isAgree:false,
        }
    },

    methods: {
        // 获取验证码
        async getRegisterCode() {
            let reg = /^1[3-9]\d{9}$/;
            try {
                if (reg.test(this.phone)) {
                    await this.$store.dispatch("user/getRegisterCode", this.phone);
                    this.code = this.$store.state.user.code;
                } else if (this.phone === '') {
                    alert("手机号不能为空~")
                } else {
                    alert("手机号不合法~")
                }
            } catch (error) {
                console.log(error);
            }

        },

        // 用户注册
        async userRegister(){
            // 所有表单验证成功
            const success = await this.$validator.validateAll();
            // 所有表单验证成功，才会发送请求
            if(success){  //success为一个布尔值

                let params = {
                    phone:this.phone,
                    password:this.password,
                    code:this.code,
                }
                try {
                    await this.$store.dispatch("user/userRegister",params)
                    this.$router.push("/login");
                } catch (error) {
                    alert(error.message)
                }
            }
        },

        
    }
}
</script>

<style lang="less" scoped>
.register-container {
    .register {
        width: 1200px;
        height: 445px;
        border: 1px solid rgb(223, 223, 223);
        margin: 0 auto;

        h3 {
            background: #ececec;
            margin: 0;
            padding: 6px 15px;
            color: #333;
            border-bottom: 1px solid #dfdfdf;
            font-size: 20.04px;
            line-height: 30.06px;

            span {
                font-size: 14px;
                float: right;

                a {
                    color: #e1251b;
                }
            }
        }

        div:nth-of-type(1) {
            margin-top: 40px;
        }

        .content {
            padding-left: 390px;
            margin-bottom: 18px;
            position: relative;

            label {
                font-size: 14px;
                width: 96px;
                text-align: right;
                display: inline-block;
            }

            input {
                width: 270px;
                height: 38px;
                padding-left: 8px;
                box-sizing: border-box;
                margin-left: 5px;
                outline: none;
                border: 1px solid #999;
            }

            img {
                vertical-align: sub;
            }

            .error-msg {
                position: absolute;
                top: 100%;
                left: 495px;
                color: red;
            }
        }

        .controls {
            text-align: center;
            position: relative;

            input {
                vertical-align: middle;
            }

            .error-msg {
                position: absolute;
                top: 100%;
                left: 495px;
                color: red;
            }
        }

        .btn {
            text-align: center;
            line-height: 36px;
            margin: 17px 0 0 55px;

            button {
                outline: none;
                width: 270px;
                height: 36px;
                background: #e1251b;
                color: #fff !important;
                display: inline-block;
                font-size: 16px;
            }
        }
    }

    .copyright {
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        line-height: 24px;

        ul {
            li {
                display: inline-block;
                border-right: 1px solid #e4e4e4;
                padding: 0 20px;
                margin: 15px 0;
            }
        }
    }
}
</style>
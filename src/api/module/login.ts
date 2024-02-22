import request from '../axios';
import CryptoJS from 'crypto-js'
/**
 * 登录
 */

interface IResponseType<P = {}> {
    code?: number;
    status: number;
    msg: string;
    data: P;
}
interface ILogin {
    token: string;
    expires: number;
}
export const login = (username: string, password: string) => {
    const key = CryptoJS.enc.Utf8.parse( 'bGvnMc62sh5RV6zP' ) // 十六位十六进制数作为密钥
    const iv = CryptoJS.enc.Utf8.parse( '1eZ43DLcYtV2xb3Y' ) // 十六位十六进制数作为密钥偏移量
    const srcs = CryptoJS.enc.Utf8.parse(password)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    return request<IResponseType<ILogin>>({
        url: '/auth/login',
        method: 'post',
        data: {
            username,
            password: encrypted.ciphertext.toString().toUpperCase()
        }
    });
};

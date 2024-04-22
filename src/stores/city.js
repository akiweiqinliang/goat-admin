import { defineStore } from 'pinia';
import {ref} from "vue";
import { pinyin } from 'pinyin-pro';
export const cityStore = defineStore('city', () => {
    const chineseCities = [
        '北京', '上海', '广州', '深圳', '天津', '成都', '重庆', '杭州', '南京', '武汉', '西安', '长沙', '青岛', '沈阳', '大连',
        '厦门', '苏州', '郑州', '宁波', '福州', '无锡', '哈尔滨', '济南', '佛山', '东莞', '温州', '泉州', '南昌', '南宁', '常州',
        '贵阳', '南通', '金华', '嘉兴', '台州', '长春', '石家庄', '昆明', '兰州', '呼和浩特', '乌鲁木齐', '合肥', '绍兴', '绵阳',
        '徐州', '廊坊', '淄博', '潍坊', '洛阳', '秦皇岛', '珠海', '中山', '惠州', '江门', '肇庆', '汕头', '梅州', '湛江', '茂名',
        '阳江', '清远', '潮州', '揭阳', '汕尾', '韶关', '云浮'
    ]
    const hotCityMap = [
        {
            city: "北京",
            relativeWords: "beijing",
            initial: "bj"
        },
        {
            city: "上海",
            relativeWords: "shanghai",
            initial: "sh"
        },
        {
            city: "广州",
            relativeWords: "guangzhou",
            initial: "gz"
        },
        {
            city: "深圳",
            relativeWords: "shenzhen",
            initial: "sz"
        },
        {
            city: "天津",
            relativeWords: "tianjin",
            initial: "tj"
        },
        {
            city: "成都",
            relativeWords: "chengdu",
            initial: "cd"
        },
        {
            city: "重庆",
            relativeWords: "chongqing",
            initial: "cq"
        },
        {
            city: "杭州",
            relativeWords: "hangzhou",
            initial: "hz"
        },
        {
            city: "南京",
            relativeWords: "nanjing",
            initial: "nj"
        },
        {
            city: "武汉",
            relativeWords: "wuhan",
            initial: "wh"
        },
        {
            city: "西安",
            relativeWords: "xian",
            initial: "xa"
        },
        {
            city: "长沙",
            relativeWords: "changsha",
            initial: "cs"
        },
        {
            city: "青岛",
            relativeWords: "qingdao",
            initial: "qd"
        },
        {
            city: "沈阳",
            relativeWords: "shenyang",
            initial: "sy"
        },
        {
            city: "大连",
            relativeWords: "dalian",
            initial: "dl"
        },
        {
            city: "厦门",
            relativeWords: "xiamen",
            initial: "xm"
        },
        {
            city: "苏州",
            relativeWords: "suzhou",
            initial: "sz"
        },
        {
            city: "郑州",
            relativeWords: "zhengzhou",
            initial: "zz"
        },
        {
            city: "宁波",
            relativeWords: "ningbo",
            initial: "nb"
        },
        {
            city: "福州",
            relativeWords: "fuzhou",
            initial: "fz"
        },
        {
            city: "无锡",
            relativeWords: "wuxi",
            initial: "wx"
        },
        {
            city: "哈尔滨",
            relativeWords: "haerbin",
            initial: "heb"
        },
        {
            city: "济南",
            relativeWords: "jinan",
            initial: "jn"
        },
        {
            city: "佛山",
            relativeWords: "foshan",
            initial: "fs"
        },
        {
            city: "东莞",
            relativeWords: "dongguan",
            initial: "dg"
        },
        {
            city: "温州",
            relativeWords: "wenzhou",
            initial: "wz"
        },
        {
            city: "泉州",
            relativeWords: "quanzhou",
            initial: "qz"
        },
        {
            city: "南昌",
            relativeWords: "nanchang",
            initial: "nc"
        },
        {
            city: "南宁",
            relativeWords: "nanning",
            initial: "nn"
        },
        {
            city: "常州",
            relativeWords: "changzhou",
            initial: "cz"
        },
        {
            city: "贵阳",
            relativeWords: "guiyang",
            initial: "gy"
        },
        {
            city: "南通",
            relativeWords: "nantong",
            initial: "nt"
        },
        {
            city: "金华",
            relativeWords: "jinhua",
            initial: "jh"
        },
        {
            city: "嘉兴",
            relativeWords: "jiaxing",
            initial: "jx"
        },
        {
            city: "台州",
            relativeWords: "taizhou",
            initial: "tz"
        },
        {
            city: "长春",
            relativeWords: "changchun",
            initial: "cc"
        },
        {
            city: "石家庄",
            relativeWords: "shijiazhuang",
            initial: "sjz"
        },
        {
            city: "昆明",
            relativeWords: "kunming",
            initial: "km"
        },
        {
            city: "兰州",
            relativeWords: "lanzhou",
            initial: "lz"
        },
        {
            city: "呼和浩特",
            relativeWords: "huhehaote",
            initial: "hhht"
        },
        {
            city: "乌鲁木齐",
            relativeWords: "wulumuqi",
            initial: "wlmq"
        },
        {
            city: "合肥",
            relativeWords: "hefei",
            initial: "hf"
        },
        {
            city: "绍兴",
            relativeWords: "shaoxing",
            initial: "sx"
        },
        {
            city: "绵阳",
            relativeWords: "mianyang",
            initial: "my"
        },
        {
            city: "徐州",
            relativeWords: "xuzhou",
            initial: "xz"
        },
        {
            city: "廊坊",
            relativeWords: "langfang",
            initial: "lf"
        },
        {
            city: "淄博",
            relativeWords: "zibo",
            initial: "zb"
        },
        {
            city: "潍坊",
            relativeWords: "weifang",
            initial: "wf"
        },
        {
            city: "洛阳",
            relativeWords: "luoyang",
            initial: "ly"
        },
        {
            city: "秦皇岛",
            relativeWords: "qinhuangdao",
            initial: "qhd"
        },
        {
            city: "珠海",
            relativeWords: "zhuhai",
            initial: "zh"
        },
        {
            city: "中山",
            relativeWords: "zhongshan",
            initial: "zs"
        },
        {
            city: "惠州",
            relativeWords: "huizhou",
            initial: "hz"
        },
        {
            city: "江门",
            relativeWords: "jiangmen",
            initial: "jm"
        },
        {
            city: "肇庆",
            relativeWords: "zhaoqing",
            initial: "zq"
        },
        {
            city: "汕头",
            relativeWords: "shantou",
            initial: "st"
        },
        {
            city: "梅州",
            relativeWords: "meizhou",
            initial: "mz"
        },
        {
            city: "湛江",
            relativeWords: "zhanjiang",
            initial: "zj"
        },
        {
            city: "茂名",
            relativeWords: "maoming",
            initial: "mm"
        },
        {
            city: "阳江",
            relativeWords: "yangjiang",
            initial: "yj"
        },
        {
            city: "清远",
            relativeWords: "qingyuan",
            initial: "qy"
        },
        {
            city: "潮州",
            relativeWords: "chaozhou",
            initial: "cz"
        },
        {
            city: "揭阳",
            relativeWords: "jieyang",
            initial: "jy"
        },
        {
            city: "汕尾",
            relativeWords: "shanwei",
            initial: "sw"
        },
        {
            city: "韶关",
            relativeWords: "shaoguan",
            initial: "sg"
        },
        {
            city: "云浮",
            relativeWords: "yunfu",
            initial: "yf"
        }
    ];

    // let hotCityMap1 = chineseCities.reduce((acc, cur) => {
    //     const relativeWords = pinyin(cur)
    //     const initial = relativeWords.split(' ').map(word => word[0]).join('')
    //     acc.push({
    //         city: cur,
    //         relativeWords,
    //         initial: initial.toLowerCase(),
    //     })
    //     return acc
    // }, [])
    // console.log(hotCityMap1)
    return { chineseCities, hotCityMap }
})

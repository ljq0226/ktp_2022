function msg() {
    return '自定义模板'
}
// 识别游览器
function browser() {
    if (/firefox/i.test(navigator.userAgent)) {
        alert('火狐浏览器')
    } else if (/chrome/i.test(navigator.userAgent)) {
        alert('谷歌浏览器')
    } else if (/mise/i.test(navigator.userAgent)) {
        alert('IE浏览器 ')
    } else if ('ActiveXObject' in window) {
        alert('IE11浏览器')
    }
}

function addClass(obj, cn) {
    // 没有才添加
    if (!hasClass(obj, cn)) {
        obj.className += ' ' + cn
    }
}

// 判断obj中有没有cn class
function hasClass(obj, cn) {
    // 用正则表达式判断 字母边界/b 确定一个字符串
    let reg = new RegExp('\\b' + cn + '\\b')
    return reg.test(obj.className)
}

// 删除class样式
function removeClass(obj, cn) {
    //有才删除
    if (hasClass(obj, cn)) {
        let reg = new RegExp('\\b' + cn + '\\b')
        obj.className = obj.className.replace(cn, '')
    }
}

// 切换一个class类
// 如果元素中具有该类,则删除
// 如果元素中没有该类,则添加
function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        removeClass(obj, cn)
    } else {
        addClass(obj, cn)
    }
}

function bind(obj, eventStr, callback) {
    if (obj.addEventListener) {
        // 大部分浏览器兼容
        obj.addEventListener(eventStr, callback, false)
    } else {
        // IE8及以下
        obj.attachEvent('on' + eventStr, callback)
    }
}

function deepClone(target) {
    let result

    if (typeof target === 'object') {
        if (Array.isArray(target)) {
            //target是数组
            result = []
            for (let i in target) {
                result.push(deepClone(target[i]))
            }
        } else if (target === null) {
            result = null
        } else if (target.constructor === RegExp) {
            // target是一个RegExp对象,直接赋值
            result = target
        } else {
            // target是一个对象
            result = {}
            for (let i in target) {
                result[i] = deepClone(target[i])
            }
        }
    } else {
        // 不是对象 直接赋值
        result = target
    }

    return result
}

// 判读字符串是不是11位电话号码
function isPhone(num) {
    if (typeof num !== 'string') {
        return false
    }
    const phoneReg = /^1[3-9][0-9]{9}$/
    return phoneReg.test(num)
}

function isChinese(val) {
    if (typeof val != 'string') {
        return false
    }
    let regExp = /^[\u4E00-\u9FA5]+$/
    return regExp.test(val)
}

function isChineseName(name) {
    return isChinese(name) && name.length < 7 && name.length > 1
}

function isContainNumber(str) {
    return /\d/.test(str)
}

function isContainSpecial(str) {
    let containSpecial = RegExp(
        /[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/
    )
    return containSpecial.test(str)
}

// 是否包含大写字母
function isContainCapital(str) {
    return /[A-Z]/g.test(str)
}

// 是否包含小写字母
function isContainLowercase(str) {
    return /[a-z]/g.test(str)
}

function isEmail(str) {
    return /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/.test(str)
}

export default {
    msg,
    browser,
    addClass,
    hasClass,
    toggleClass,
    bind,
    removeClass,
    deepClone,
    isPhone,
    isChinese,
    isChineseName,
    isContainNumber,
    isEmail,
    isContainLowercase,
    isContainCapital,
    isContainSpecial,
}

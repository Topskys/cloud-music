function productClassCSS(options) {
    console.log('production is running')
        // 类名
    let className = options.className;
    let cssName = options.cssName;
    // 有一个值
    let oneValue = options.oneValue || 0;
    // 有两个值
    let twoValue1 = options.twoValue1 || 0;
    let twoValue2 = options.twoValue2 || 0;
    // 有四个值
    let firstValue = options.firstValue || 0;
    let secondValue = options.secondValue || 0;
    let thirdValue = options.thirdValue || 0;
    let fourthValue = options.fourthValue || 0;

    let index1 = options.index1 || 0;
    let index2 = options.index2 || 1;
    let inter = options.inter || 5;


    let str1 = ''
    let str2 = ''
    let str3 = ''
    for (var i = index1; i < index2; i++) {
        // 一个值
        str1 += `.${className}${oneValue}{\n${cssName}:${oneValue}px;\n}`;
        oneValue += inter;
        // 两个值
        str2 += `.${className}${twoValue1}-${twoValue2}{\n${cssName}:${twoValue2}px\t${twoValue1}px;\n}`;
        twoValue1 += inter;
        twoValue2 += inter;
        // 四个值
        str3 += `.${className}${firstValue}-${secondValue}-${thirdValue}-${fourthValue}{\n${cssName}:${firstValue}px\t${secondValue}px\t${thirdValue}px\t${fourthValue};\n}`;
        firstValue += inter;
        secondValue += inter;
        thirdValue += inter;
        fourthValue += inter;
    }
    // console.log(str1)
    console.log(str2)
        // console.log(str3)

}




productClassCSS({
    className: 'pg',
    cssName: 'padding',
    // 有一个值
    oneValue: 5,
    // 有两个值
    twoValue1: 5,
    twoValue2: 0,
    // 有四个值
    firstValue: 5,
    secondValue: 13,
    thirdValue: 25,
    fourthValue: 30,
})
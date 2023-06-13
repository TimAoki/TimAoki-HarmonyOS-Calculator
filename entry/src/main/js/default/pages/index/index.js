export default {
    data: { //定义所需变量
        operator: "", //保存运算符
        calc: "", //保存当前表达式
        a:0, //a值
        b:0, //b值
        aprevious: "", //保存上一个a值
        bprevious: "", //保存上一个b值
        previous: "", //保存之前的表达式
        result: "" //保存计算结果
    },

    Init(){ //初始化函数
        this.calc= this.calc; //将calc和result初始化为自己
        this.result=this.result;
    },

    getPressedValue(e) { //获取用户按下的按钮
        const val=this.$element(e.target.id); //获取用户按下按钮的value
        console.log("a"+this.a+"b"+this.b+"aprev"+this.aprevious+"bprev"+this.bprevious+"prev"+this.previous+"calc"+this.calc+"res"+this.result);

        if(val.attr.id=="%" || val.attr.id=="*" || val.attr.id=="+" || val.attr.id=="-" || val.attr.id=="/" || val.attr.id=="power") { //如果是运算符按钮
            this.operator = val.attr.id; //赋值运算符
            this.a = Number(this.aprevious); //将上一个a值转换成数字类型赋给a变量
            if(this.result!==""){ //如果结果不为空
                this.a = Number(this.result); //将结果转换成数字类型给a变量
               this.calc=this.result+this.operator; //将结果和运算符拼接出新的表达式，赋给calc
                this.bprevious=""; //将上一个b值设为空字符串
                this.b=0; //将b设为0
            }
            else{ //如果结果为空
                this.calc = this.aprevious + this.operator; //将上一个a值和运算符拼接成新的表达式，赋给calc
            }

            this.result=""; //将结果清零

        }
        else if(val.attr.id=="equalTo"){ //如果是等于号按钮
            this.b=Number(this.bprevious); //将上一个b值转换成数字类型，赋给b变量
            if(this.operator=="+"){ //如果是加法运算
                this.result=this.a+this.b; //计算结果
            }
            else if(this.operator=="-"){ //如果是减法运算
                this.result=this.a-this.b; //计算结果
            }
            else if(this.operator=="*"){ //如果是乘法运算
                this.result=Math.imul(this.a,this.b); //计算结果
            }
            else if(this.operator=="/"){ //如果是除法运算
                this.result=this.a/this.b; //计算结果
            }
            else if(this.operator=="%"){ //如果是求余运算
                this.result=this.a%this.b; //计算结果
            }
            else if(this.operator=="power"){ //如果是指数运算
                this.result=Math.pow(this.a,this.b); //计算结果
            }
//            this.previous=this.calc;
            this.calc=this.a+this.operator+this.b; //将结果、运算符、b值拼接成新的表达式，赋给calc
        }
        else{ //如果不是运算符按钮或等于号按钮
            if(val.attr.id=="ac"){ //如果是AC按钮
                this.previous=""; //将之前的表达式设为""
                this.aprevious=""; //将上一个a值设为空字符串
                this.bprevious=""; //将上一个b值设为空字符串
                this.result=""; //将结果设为空字符串
                this.a=0; //将a设为0
                this.b=0; //将b设为0
                this.calc=""; //将calc设为""
                this.operator=""; //将运算符设为""
            }
            else if(val.attr.id=="c") { //如果是C按钮
                if(this.result!==""){ //如果结果不为空
                    this.result = ""; //将结果设为""
                }
                else{
                    this.calc=this.calc.substring(0,this.calc.length-1); //将当前表达式去除最后一个字符，重新赋给calc
                }

                let i;
                for(i=0;i<this.calc.length;i++){ //遍历当前表达式
                    const sval=this.calc.charAt(i);
                    if(sval== "+" || sval== "-" || sval== "*" || sval== "/" || sval== "%" || sval== "power"){ //如果找到运算符
                        this.operator=this.calc.charAt(i); //将运算符设为找到的运算符
                        this.a=Number(this.calc.substring(0,i)); //将从当前表达式开头到运算符前的数字部分转换成数字类型，赋给a
                        break; //退出循环
                    }
                }
                let afteroper ="";
                for(let j=i+1;j<this.calc.length;j++){ //将运算符后的数字部分合成字串，赋给afteroper
                    afteroper+=this.calc.charAt(j);
                }
                if(afteroper.length>0){ //如果afteroper不为空
                    this.bprevious=afteroper; //将afteroper给bprevious
                }else{ //否则
                    this.bprevious=""; //将bprevious设为空字符串
                    this.b=0; //将b设为0
                }
            }
            else { //如果不是C或AC按钮
                if(this.opertor!=="" && this.a>0 ) { //如果有运算符，并且a大于0
                    this.bprevious = this.bprevious + val.attr.value; //将输入的值加入bprevious中
                    this.calc = this.a+this.operator+this.bprevious; //将a、运算符、bprevious拼接成新的表达式，赋给calc
                }
                else if(this.operator===""){ //如果没有运算符
                    this.aprevious = this.aprevious + val.attr.value; //将值添加到上一个a值后面
                    this.calc = this.aprevious; //将aprevious赋给calc
                }
                this.previous=this.calc; //将当前表达式赋给previous
            }
            this.result=""; //将结果设为空字符串
        }
    }

}

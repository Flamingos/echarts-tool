function codeFormat() {
    return {
        format: function (option) {
            return `<template>
    <div>
        <div ref="chart" style="width:600px;height:400px;"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            option: ${JSON.stringify(option, null, '\t')}
        };
    },
    mounted() {
        this.$echarts.init(this.$refs.chart).setOption(this.option);
    }
};
</script>`
        },
        format2: function (option) {
            let code = "";
            let str = JSON.stringify(option);

            function type(value) {
                return Object.prototype.toString.call(value).slice(8, -1);
            }
            function space(num) {
                let spacestr = "";
                for (let i = 0; i < num; i++) {
                    spacestr += "  ";
                }
                return spacestr;
            }
            let test = function (obj, num) {
                for (let [key, value] of Object.entries(obj)) {
                    code += space(num) + key + ":";
                    if (type(value) == "Object") {
                        if (JSON.stringify(value) == "{}") {
                            code += "{},\n";
                        } else {
                            code += "{\n";
                            test(value, num + 1);
                            code += space(num) + "},\n";
                        }
                    } else if (type(value) == "Array") {
                        if (value.length == 0) {
                            code += "[],\n";
                        } else if (type(value[0]) == "Object") {
                            code += "[\n";
                            for (let item of value) {
                                code += space(num + 1) + "{\n";
                                test(item, num + 2);
                                code += space(num + 1) + "},\n";
                            }
                            code += space(num) + "],";
                        } else {
                            code += JSON.stringify(value) + "," + "\n";
                        }
                    } else {
                        code += JSON.stringify(value) + ",\n";
                    }
                }
            };
            test(option, 1);
            code = "var option={\n" + code + "\n}";
            return code;
        }
    }
}

export {
    codeFormat
}
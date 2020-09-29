<template>
    <div class="highsearh-wrapper" v-if="isShow">
        <div class="search-operate-wrapper">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addQuery">添加</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeQuery">删除</el-button>
            <el-button type="info" size="mini" icon="el-icon-refresh-left" @click="resetQuery">重置</el-button>
            <el-button type="default" size="mini" icon="el-icon-refresh-left" @click="clearQuery">清空</el-button>
        </div>
        
        <el-row v-for="(query,index) in dynamicQueryList" :key="index" :gutter="20">
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <span>字段：</span>
                <el-select v-model="query.fieldObj" filterable placeholder="字段名" @change="changeFieldName($event,index)" value-key="fieldName">
                <el-option
                    v-for="item in filedList"
                    :key="item.fieldName"
                    :label="item.fieldChName"
                    :value="item">
                </el-option>
                </el-select>
            </el-col>

            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <span>操作符：</span>
                <el-select v-model="query.operation" filterable placeholder="操作符">
                <el-option
                    v-for="item in operatorList"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value">
                </el-option>
                </el-select>
            </el-col>

            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <span>数据：</span>
                <el-input v-if="query.type == 'text' || !query.type" v-model="query.value" placeholder="值" style="width: 180px;"></el-input>
                
                <el-date-picker
                v-if="query.type == 'date'"
                v-model="query.value"
                type="date"
                style="width: 180px;"
                format="yyyy-MM-dd"
                placeholder="选择日期">
                </el-date-picker>

                <el-select v-if="query.type == 'type'" v-model="query.value" filterable style="width: 180px;">
                <el-option
                    v-for="item in query.sysCodeList"
                    :key="item.id"
                    :label="item.codeName"
                    :value="source == 'T' ? item.codeDesc : item.codeValue">
                </el-option>
                </el-select>

            </el-col>

            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <span>关联：</span>
                <el-select v-model="query.relation" placeholder="请选择">
                <el-option key="and" label="并且" value="and"></el-option>
                <el-option key="or" label="或者" value="or"></el-option>
                </el-select>
            </el-col>

            <el-col>
                
            </el-col>
        </el-row>

        <div slot="footer" class="highsearh-footer">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button type="primary" @click="sureQuery">确 定</el-button>
        </div>
    </div>
    </template>

    <script>
    export default {
        name: 'wkSearch',
        data() {
            return {
            dynamicQueryList: [
                {
                fieldObj: null,
                field: null,
                operation: "eq",
                relation: "and",
                sysCodeList: [],
                type: null,
                value: null,
                whereClause: null
                }
            ],

            isShow: false,

            
            filedList: [],

            // 操作符
            operatorList: [
                {
                lable: "等于",
                value: "eq"
                }
            ],

            source: null,
            tableName: null
            }
        },
        methods: {
            getQueryField(table) {
                this.filedList = [];
                this.isShow = !this.isShow;
                this.tableName = table.alias;
                if(this.isShow) {
                    table.headers.forEach(element => {
                        if(element.type) {
                            this.filedList.push({
                            fieldChName: element.label,
                            fieldDbType: element.type,
                            // fieldName: element.type == 'type' ? element.searchSelect : element.prop,
                            fieldName: element.searchSelect ? element.searchSelect : element.prop,
                            whereClause: element.whereClause
                        });
                        }
                    });
                }
            },
            /**
             * 操作符
            ：字符类型： eq(等于)   like(相似)   unlike(不相似)
            ：数字类型： eq(等于)   lt(小于)      gt(大于)    eqlt(小于等于)   eqgt(大于等于)
            ：时间类型： eq(等于)   lt(小于)      gt(大于)    eqlt(小于等于)   eqgt(大于等于)
            ：状态类型： eq(等于)
            */
            changeFieldName(selVal,index) {
                this.dynamicQueryList[index].type = selVal.fieldDbType;
                this.dynamicQueryList[index].field = selVal.fieldName;
                this.dynamicQueryList[index].whereClause = selVal.whereClause;
                if(selVal.fieldDbType == "text") {
                this.operatorList = [
                    {
                    lable: "等于",
                    value: "eq"
                    },
                    {
                    lable: "相似",
                    value: "like"
                    },
                    {
                    lable: "不相似",
                    value: "unlike"
                    },
                ];
                }else if(selVal.fieldDbType == "Number" || selVal.fieldDbType == "date") {
                this.operatorList = [
                    {
                    lable: "等于",
                    value: "eq"
                    },
                    {
                    lable: "小于",
                    value: "lt"
                    },
                    {
                    lable: "大于",
                    value: "gt"
                    },
                    {
                    lable: "小于等于",
                    value: "eqlt"
                    },
                    {
                    lable: "大于等于",
                    value: "eqgt"
                    }
                ];
                }else if(selVal.fieldDbType == "type") {
                this.operatorList = [
                    {
                    lable: "等于",
                    value: "eq"
                    }
                ];
                this.$axios
                .post("basic/sysCode/qc", {
                    codeType: selVal.fieldName
                })
                .then(res => {
                    if (res.status == "OK") {
                    this.dynamicQueryList[index].sysCodeList = res.data;
                    }
                    if (res.status == "ERROR") {
                    this.$alert(res.data, "sysCode提示");
                    }
                })
                .catch(function(error) {
                    console.log("error init." + error);
                });
                }
            },

            //增加查询条件
            addQuery() {
                this.dynamicQueryList.push({
                fieldObj: null,
                field: null,
                operation: "eq",
                sysCodeList: [],
                relation: "and",
                value: null,
                whereClause: null
                });
            },
            //删除查询条件
            removeQuery() {
                this.dynamicQueryList.pop();
            },

            // 重置
            resetQuery() {
                this.dynamicQueryList = [
                    {
                    fieldObj: null,
                    field: null,
                    operation: "eq",
                    relation: "and",
                    sysCodeList: [],
                    type: null,
                    value: null,
                    whereClause: null
                    }
                ];

                this.operatorList = [
                    {
                    lable: "等于",
                    value: "eq"
                    }
                ];
            },

            // 清空
            clearQuery() {
                this.dynamicQueryList = [];

                this.operatorList = [];
            },

            p(s) {
                return s < 10 ? '0' + s : s
            },

            // 确认
            sureQuery() {
                let params = params;
                let otherWhereClause = "";
                this.dynamicQueryList.forEach(item => {
                    if(item.type == "date") {
                    const d = new Date(item.value);
                    item.value  = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate());
                    } 
                    if(item.whereClause == "otherWhereClause") {
                    if(item.operation == "eq" && item.type != "date") {//等于
                        otherWhereClause += `${item.relation} _${item.field}='${item.value}'`
                    }else if(item.operation == "eq" && item.type == "date") {//等于
                        otherWhereClause += `${item.relation} DATE_FORMAT(_${item.field}.${item.field},'%Y-%m-%d')='${item.value}'`
                    }else if(item.operation == "like") {//相似
                        otherWhereClause += ` ${item.relation} _${item.field} like '%${item.value}%'`
                    }else if(item.operation == "unlike") {//不相似
                        otherWhereClause += ` ${item.relation} _${item.field} unlike '%${item.value}%'`
                    }else if(item.operation == "lt") {//小于
                        otherWhereClause += ` ${item.relation} _${item.field} < '${item.value}'`
                    }else if(item.operation == "gt") {//大于
                        otherWhereClause += ` ${item.relation} _${item.field} > '${item.value}'`
                    }else if(item.operation == "eqlt") {//小于等于
                        otherWhereClause += ` ${item.relation} _${item.field} <= '${item.value}'`
                    }else if(item.operation == "eqgt") {//大于等于
                        otherWhereClause += ` ${item.relation} _${item.field} >= '${item.value}'`
                    }
                    }else {
                    if(item.operation == "eq" && item.type != "date") {//等于
                        otherWhereClause += `${item.relation} ${this.tableName}.${item.field}='${item.value}'`
                    }else if(item.operation == "eq" && item.type == "date") {//等于
                        otherWhereClause += `${item.relation} DATE_FORMAT(${this.tableName}.${item.field},'%Y-%m-%d')='${item.value}'`
                    }else if(item.operation == "like") {//相似
                        otherWhereClause += ` ${item.relation} ${this.tableName}.${item.field} like '%${item.value}%'`
                    }else if(item.operation == "unlike") {//不相似
                        otherWhereClause += ` ${item.relation} ${this.tableName}.${item.field} unlike '%${item.value}%'`
                    }else if(item.operation == "lt") {//小于
                        otherWhereClause += ` ${item.relation} ${this.tableName}.${item.field} < '${item.value}'`
                    }else if(item.operation == "gt") {//大于
                        otherWhereClause += ` ${item.relation} ${this.tableName}.${item.field} > '${item.value}'`
                    }else if(item.operation == "eqlt") {//小于等于
                        otherWhereClause += ` ${item.relation} ${this.tableName}.${item.field} <= '${item.value}'`
                    }else if(item.operation == "eqgt") {//大于等于
                        otherWhereClause += ` ${item.relation} ${this.tableName}.${item.field} >= '${item.value}'`
                    }
                    }
                });
                params = {
                    otherWhereClause: otherWhereClause,
                    _PAGE: 0 
                }
                

                if(this.dynamicQueryList.length > 0) {
                this.$parent.initData(params);
                }else {
                this.$parent.initData({_PAGE: 0});
                }

                // this.isShow = false;
            },
        }
    }
</script>

<style>

.search-operate-wrapper {
    border-bottom: 1px solid #dcdfe6;
    padding-bottom: 10px;
    text-align: left;
}
.search-table {
    width: 100%;
    min-height: 100px;
    margin-top: 10px;
}
.search-table td {
    padding: 10px;
}
.highsearh-footer {
    text-align: right;
}
</style>

<!-- 任务单条件筛选 -->
<template>
  <div style="display:flex">
    <el-select v-model="colSel" placeholder="请选择" style="width:130px" filterable size="mini">
      <el-option
        v-for="item in columnSelect"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-input
      v-if="colShow"
      placeholder="输入关键字搜索"
      v-model="keyword"
      size="mini"
      @keyup.enter.native="getTasks()"
      style="width:300px"
    ></el-input>
    <el-select
      v-if="colSel === 'status' || colSel === 'grade'||colSel === 'priority'||colSel === 'executor_ids'||colSel === 'episode'||colSel === 'session'"
      v-model="colSel2"
      placeholder="请选择"
      style="width:300px;margin-top:1px"
      multiple
      filterable
      size="mini"
    >
      <el-option
        v-for="item in columnSelect2"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <div v-if="colSel === 'start_date' || colSel === 'end_date'" style="width:280px;display:flex;">
      <el-date-picker
        v-model="timeSelection"
        type="date"
        placeholder="选择日期"
        size="mini"
        @change="getTasks()"
      ></el-date-picker>
      <span style="text-align:center;padding-top:3px">至</span>
      <el-date-picker
        v-model="timeSelection2"
        type="date"
        placeholder="选择日期"
        size="mini"
        @change="getTasks()"
      ></el-date-picker>
    </div>

    <el-button
      @click="getTasks()"
      size="mini"
      icon="el-icon-search"
      type="primary"
      style="height:27.99px"
    />
  </div>
</template>

<script>
import { getProjectMember, getEpisodeSession } from "@/api/statistics";
export default {
  name: "taskSel",
  components: {},
  data() {
    return {
      colSel: "name",
      columnSelect: [
        {
          value: "name",
          label: "任务名称"
        },
        {
          value: "dept",
          label: "环节"
        },
        {
          value: "content",
          label: "制作内容"
        },
        {
          value: "assetname",
          label: "镜头号"
        },
        {
          value: "episode",
          label: "集数"
        },
        {
          value: "session",
          label: "场次"
        },
        {
          value: "priority",
          label: "优先级"
        },
        {
          value: "grade",
          label: "任务难度"
        },
        {
          value: "executor_ids",
          label: "执行人"
        },
        {
          value: "user",
          label: "创建人"
        },
        {
          value: "status",
          label: "状态"
        },
        {
          value: "start_date",
          label: "开始日期"
        },
        {
          value: "end_date",
          label: "结束日期"
        },
        {
          value: "total_hour",
          label: "总工时"
        }
      ],
      colShow: true,
      colSel2: [],
      keyword: "",
      columnSelect2: [],
      timeSelection: "",
      timeSelection2: "",
      name: "" //任务导出字段
    };
  },
  watch: {
    colSel: {
      handler: function(newVal, oldVal) {
        this.columnSelect2 = [];
        switch (newVal) {
          case "status":
            this.colShow = false;
            this.columnSelect2 = [
              {
                value: 0,
                label: "暂停"
              },
              {
                value: 1,
                label: "未开始"
              },
              {
                value: 2,
                label: "进行中"
              },
              {
                value: 3,
                label: "审核中"
              },
              {
                value: 4,
                label: "完成"
              },
              {
                value: 5,
                label: "超时"
              },
              {
                value: 6,
                label: "反馈中"
              }
            ];
            break;
          case "grade":
            this.colShow = false;
            this.colSel2 = [1];
            this.columnSelect2 = [
              {
                label: "A+",
                value: 0
              },
              {
                label: "A",
                value: 1
              },
              {
                label: "A-",
                value: 2
              },
              {
                label: "B+",
                value: 3
              },
              {
                label: "B",
                value: 4
              },
              {
                label: "B-",
                value: 5
              },
              {
                label: "C+",
                value: 6
              },
              {
                label: "C",
                value: 7
              },
              {
                label: "D+",
                value: 8
              },
              {
                label: "D",
                value: 9
              },
              {
                label: "E",
                value: 10
              }
            ];
            break;
          case "priority":
            this.colShow = false;
            this.colSel2 = [0];
            this.columnSelect2 = [
              {
                value: 0,
                label: "低"
              },
              {
                value: 1,
                label: "中"
              },
              {
                value: 2,
                label: "高"
              }
            ];
            break;
          case "executor_ids":
            this.colShow = false;
            // this.colSel2 = [0];
            // this.columnSelect2=[];
            getProjectMember({ id: this.$route.params.id, members: "" }).then(
              ({ data }) => {
                [...data.msg].map(item => {
                  this.columnSelect2.push({
                    value: item.userid,
                    label: item.username
                  });
                });
              }
            );
            break;
          case "episode":
            this.colShow = false;
            getEpisodeSession({ id: this.$route.params.id, episode: "" }).then(
              ({ data }) => {
                [...data.msg].map(item => {
                  this.columnSelect2.push({
                    value: item,
                    label: item
                  });
                });
              }
            );
            break;
          case "session":
            this.colShow = false;
            getEpisodeSession({ id: this.$route.params.id, session: "" }).then(
              ({ data }) => {
                [...data.msg].map(item => {
                  this.columnSelect2.push({
                    value: item,
                    label: item
                  });
                });
              }
            );
            break;
          case "start_date":
            this.colShow = false;
            this.timeSelection = "";
            this.timeSelection2 = "";
            break;
          case "end_date":
            this.colShow = false;
            this.timeSelection = "";
            this.timeSelection2 = "";
            break;
          default:
            this.colShow = true;
            this.colSel2 = [];
            this.columnSelect2 = [];
        }
      }
    }
  },
  methods: {
    getTasks() {
      let data = {};
      function DateFormat(dateVal) {
        return new Date(dateVal).toLocaleDateString();
      }
      switch (this.colSel) {
        case "name":
          this.keyword &&
            (data = { ...data, name: this.keyword, pagenum: 20, page: 1 });
          this.name = { name: this.keyword };
          break;
        case "assetname":
          this.keyword &&
            (data = { ...data, assetname: this.keyword, pagenum: 20, page: 1 });
          this.name = { assetname: this.keyword };
          break;
        case "dept":
          this.keyword && (data = { ...data, dept: this.keyword });
          this.name = { dept: this.keyword };
          break;
        case "content":
          this.keyword && (data = { ...data, content: this.keyword });
          this.name = { content: this.keyword };
          break;
        case "user":
          this.keyword && (data = { ...data, user: this.keyword });
          this.name = { user: this.keyword };
          break;
        case "total_hour":
          this.keyword && (data = { ...data, total_hour: this.keyword });
          this.name = { total_hour: this.keyword };
          break;
        case "start_date":
          if (!this.timeSelection && this.timeSelection2) {
            data = {
              ...data,
              start: "" + "," + DateFormat(this.timeSelection2)
            };
          } else if (this.timeSelection && !this.timeSelection2) {
            data = {
              ...data,
              start: DateFormat(this.timeSelection) + "," + ""
            };
          } else {
            data = {
              ...data,
              start:
                DateFormat(this.timeSelection) +
                "," +
                DateFormat(this.timeSelection2)
            };
          }
          this.name = {
            start_date: DateFormat(this.timeSelection)
          };
          break;
        case "end_date":
          if (!this.timeSelection && this.timeSelection2) {
            data = {
              ...data,
              end: "" + "," + DateFormat(this.timeSelection2)
            };
          } else if (this.timeSelection && !this.timeSelection2) {
            data = {
              ...data,
              end: DateFormat(this.timeSelection) + "," + ""
            };
          } else {
            data = {
              ...data,
              end:
                DateFormat(this.timeSelection) +
                "," +
                DateFormat(this.timeSelection2)
            };
          }
          this.name = { end_date: DateFormat(this.timeSelection) };
          break;
        case "priority":
          if (this.colSel2.length) {
            data = {
              ...data,
              priority: "[" + String(this.colSel2) + "]"
            };
            this.name = { priority: "[" + String(this.colSel2) + "]" };
          }
          break;
        case "status":
          if (this.colSel2.length) {
            data = {
              ...data,
              status: "[" + String(this.colSel2) + "]"
            };
            this.name = { status: "[" + String(this.colSel2) + "]" };
          }
          break;
        case "grade":
          if (this.colSel2.length) {
            data = {
              ...data,
              grade: "[" + String(this.colSel2) + "]"
            };
            this.name = { grade: "[" + String(this.colSel2) + "]" };
          }
          break;
        case "executor_ids":
          if (this.colSel2.length) {
            data = {
              ...data,
              executor_ids: "[" + String(this.colSel2) + "]"
            };
            this.name = { executor_ids: "[" + String(this.colSel2) + "]" };
          }
          break;
        case "episode":
          if (this.colSel2.length) {
            data = {
              ...data,
              episode: String(this.colSel2)
            };
            this.name = { episode: "[" + String(this.colSel2) + "]" };
          }
          break;
        case "session":
          if (this.colSel2.length) {
            data = {
              ...data,
              session: String(this.colSel2)
            };
            this.name = { session: "[" + String(this.colSel2) + "]" };
          }
          break;
      }
      this.$emit("refreshTaskList", 3, data, this.name);
    },
    //重置
    refreshOneSel() {
      this.keyword = "";
      this.colSel = "name";
      this.colSel2 = [];
      this.timeSelection = "";
      this.timeSelection2 = "";
    }
  },
  created() {
    // store 中的 isFilterOverdue决定是否少选条件为  状态：超期
    if (this.$store.state.project.isFilterOverdue) {
      this.colSel = "status"
      this.colSel2 = [5]
      this.$store.commit('project/setFilterOverdue',false)
      this.$nextTick(()=>{
        this.getTasks()
      })
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
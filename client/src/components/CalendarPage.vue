<template>
  <div class="container"> 
  <div class="task-add">
    <h1>Add Task</h1>
    <el-form :model="task" ref="taskForm" label-width="120px" class="task-form">
      <el-form-item label="Content" :rules="[{ required: true, message: 'Please input task content', trigger: 'blur' }]">
        <el-input v-model="task.content" placeholder="Enter task content"></el-input>
      </el-form-item>

      <el-form-item label="Category" :rules="[{ required: true, message: 'Please input task category', trigger: 'blur' }]">
        <el-input v-model="task.category" placeholder="Enter task category"></el-input>
      </el-form-item>

      <el-form-item label="Time Mode" :rules="[{ required: true, message: 'Please input time mode', trigger: 'blur' }]">
        <el-input v-model="task.timeMode" placeholder="Enter time mode"></el-input>
      </el-form-item>

      <el-form-item label="Start Time" :rules="[{ required: true, message: 'Please select start time', trigger: 'blur' }]">
        <el-date-picker v-model="task.startTime" type="datetime" placeholder="Select start time" style="width: 100%"></el-date-picker>
      </el-form-item>

      <el-form-item label="End Time" :rules="[{ required: true, message: 'Please select end time', trigger: 'blur' }]">
        <el-date-picker v-model="task.endTime" type="datetime" placeholder="Select end time" style="width: 100%"></el-date-picker>
      </el-form-item>

      <el-form-item label="Probable Time" :rules="[{ required: true, message: 'Please input probable time', trigger: 'blur' }]">
        <el-input v-model="task.probableTime" placeholder="Enter probable time"></el-input>
      </el-form-item>

      <el-form-item label="Is Aware">
        <el-checkbox v-model="task.isAware">Is Aware</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitTask" class="submit-btn">Add Task</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table-container">
    <!-- 表头时间轴 -->
    <div class="time-column" v-for="(column, index) in 3" :key="index">
      <div class="time-slot" v-for="hour in hours" :key="hour">
        <div class="time-label">
          {{ formatTime(hour + (index * 8)) }}
        </div>
        <div
          v-for="task in tasksByHour[hour + (index * 8)]"
          :key="task.id"
          class="task-bar"
          :style="getTaskBarStyle(task)"
          @mouseover="showTaskDetails(task, $event)"
          @mouseleave="hideTaskDetails"
        >
        </div>
      </div>
    </div>

    <!-- 任务详细信息框 -->
    <div v-if="showDetails" :style="taskDetailsStyle" class="task-details-box">
      <p><strong>Task:</strong> {{ taskDetails.content }}</p>
      <p><strong>Start Time:</strong> {{ taskDetails.startTime }}</p>
      <p><strong>End Time:</strong> {{ taskDetails.endTime }}</p>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props:['date'],//接收传递的日期
  data() {
    return {
      tasks: [
        {
          id: 1,
          content: "Team meeting",
          startTime: "2025-01-31T01:00:00.000Z", // UTC 时间
          endTime: "2025-01-31T02:00:00.000Z",   // UTC 时间
        },
        {
          id: 2,
          content: "Project planning",
          startTime: "2025-01-31T03:00:00.000Z",
          endTime: "2025-01-31T09:00:00.000Z",
        },
      ],
      task:{
        content:'',
        category:'',
        timeMode:'',
        startTime:'',
        endTime:'',
        probableTime:'',
        isAware:'',
      },
      seletedDate:this.date,
      hours: Array.from({ length: 8 }, (_, i) => i), // 每列显示 8 个小时，共三列
      dayStartTime: new Date("2025-01-31T00:00:00.000Z").getTime(), // 当日的起始时间（00:00）
      tasksByHour: Array.from({ length: 24 }, () => []), // 初始化 24 个时间段，每个时间段内有一个空数组
      showDetails: false,  // 控制任务详情框的显示
      taskDetails: {},     // 保存当前任务的详细信息
      taskDetailsStyle: {  // 样式
        position: "absolute",
        backgroundColor: "white",
        border: "1px solid #ccc",
        padding: "10px",
        zIndex: "1000",
      },
    };
  },
  mounted() {
    this.fetchTasks();//获取任务数据
  },
  methods: {
    async submitTask() {
      try {
        
        const response = await axios.post('http://localhost:3001/route/buildSchedule', {
          date: this.seletedDate, // 发送任务的日期
          schedule: this.task, // 发送任务数据
        });

        if (response.status === 200) {
          console.log('Task added successfully:', response.data);
          // 更新任务列表，显示成功消息等
        }
        this.fetchTasks();
        this.processTasks;
      } catch (error) {
        console.error('Error adding task:', error.response || error.message);
      }
    },
    async fetchTasks(){
      try{
        const response=await axios.get('http://localhost:3001/route/gettable',{params:{date:this.seletedDate},});
        this.tasks=response.data.data;
        console.log(response.data);
        this.processTasks();  // 处理任务数据
        console.log('fetch');
        console.log(this.tasks);
      }catch(error){
        console.error('Error fetching tasks:',error);
      }
    },
    formatTime(hour) {
      return `${String(hour).padStart(2, "0")}:00`;
    },
    processTasks() {
      this.tasks.forEach((task) => {
        const taskStart = new Date(task.startTime).getHours(); // 获取任务开始的小时（local时间）
        const taskEnd = new Date(task.endTime).getHours(); // 获取任务结束的小时（local时间）

        // 将任务添加到相应的时间段数组中
        for (let i = taskStart; i < taskEnd; i++) {
          this.tasksByHour[i].push(task);
        }
      });
      console.log(this.tasks);
    },
    getTaskBarStyle(task) {
      const taskStart = new Date(task.startTime).getUTCHours();
      const taskEnd = new Date(task.endTime).getUTCHours();
      const hourHeight = 70; // 每个时间段的高度
      const taskDuration = taskEnd - taskStart; // 任务的持续时间（小时）

      // 任务条的高度应该为任务持续时间（以小时为单位）乘以每个时间段的高度（60px）
      const taskHeight = Math.min(taskDuration * hourHeight, hourHeight); // 限制最大高度为60px

      // 计算任务条的上偏移量，表示任务开始的时间
      return {
        height: `${taskHeight}px`,  // 动态设置任务条的高度，不能超过最大高度
        top: `0px`,      // 动态设置任务条的上偏移量
        backgroundColor: "lightblue",
        borderRadius: "4px",
        width: "20px",  // 固定宽度
        position: "absolute",
        left: "60px",  // 任务条从右边开始（60px 留给时间段字符）
      };
    },
    showTaskDetails(task, event) {
      this.taskDetails = task;
      this.showDetails = true;

      // 设置任务详情框的位置
      const rect = event.target.getBoundingClientRect();
      this.taskDetailsStyle.top = `${rect.top + window.scrollY + 20}px`;  // 任务条的上方位置
      this.taskDetailsStyle.left = `${rect.left + window.scrollX + 20}px`;  // 任务条的右侧位置
    },
    hideTaskDetails() {
      this.showDetails = false;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  width:100%;
}

.table-container {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.time-column {
  width: 33.33%; /* 每列宽度为 1/3 */
  border-right: 1px solid #ccc;
}

.time-slot {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 5px;
  border-bottom: 1px solid #020202;
  height: 60px; /* 每个时间段的高度 */
  position: relative;
}

.time-label {
  width: 60px; /* 时间段字符部分的宽度 */
  padding-right: 10px;
  font-weight: bold;
}

.task-bar {
  position: absolute;
  left: 60px;
  width: 20px;
  background: linear-gradient(45deg, #4caf50, #81c784);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.task-bar:hover {
  transform: scale(1.1);
}

.task-details-box {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1000;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 200px;
}
.task-add {
  width: 800px;
  
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.el-form {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.el-form-item {
  margin-bottom: 20px;
}

.el-form-item label {
  font-size: 14px;
  font-weight: bold;
}

.el-input, .el-date-picker {
  width: 100%;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #409EFF;
  border-color: #409EFF;
}

.submit-btn:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.el-checkbox {
  margin-top: 10px;
}

.el-input,
.el-date-picker,
.el-checkbox {
  font-size: 14px;
}

.el-form-item:last-child {
  margin-bottom: 0;
}
</style>


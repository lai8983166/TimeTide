<template>
  <div class="table-container">
    <!-- 表头时间轴 -->
    <div class="time-column" v-for="(column, index) in 3" :key="index">
      <div class="time-slot" v-for="hour in hours" :key="hour">
        <div class="time-label">
          {{ formatTime(hour + (index * 8)) }} 
        </div>
        <div v-for="task in tasksByHour[hour + (index * 8)]" :key="task.id" class="task-bar" 
             :style="getTaskBarStyle(task, hour + (index * 8))">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
          endTime: "2025-01-31T07:40:00.000Z",
        },
      ],
      hours: Array.from({ length: 8 }, (_, i) => i), // 每列显示 8 个小时，共三列
      dayStartTime: new Date("2025-01-31T00:00:00.000Z").getTime(), // 当日的起始时间（00:00）
      tasksByHour: Array.from({ length: 24 }, () => []), // 初始化 24 个时间段，每个时间段内有一个空数组
    };
  },
  mounted() {
    this.processTasks(); // 处理任务数据
  },
  methods: {
    formatTime(hour) {
      return `${String(hour).padStart(2, "0")}:00`;
    },
    processTasks() {
      this.tasks.forEach((task) => {
        const taskStart = new Date(task.startTime).getUTCHours(); // 获取任务开始的小时（UTC时间）
        const taskEnd = new Date(task.endTime).getUTCHours(); // 获取任务结束的小时（UTC时间）

        // 将任务添加到相应的时间段数组中
        for (let i = taskStart; i <= taskEnd; i++) {
          this.tasksByHour[i].push(task);
        }
      });
    },
    getTaskBarStyle(task, currentHour) {
      const taskStart = new Date(task.startTime).getUTCHours();
      const taskEnd = new Date(task.endTime).getUTCHours();
      const hourHeight = 70; // 每个时间段的高度
      const taskDuration = taskEnd - taskStart; // 任务的持续时间（小时）

      // 任务条的高度应该为任务持续时间（以小时为单位）乘以每个时间段的高度（60px）
      const taskHeight = Math.min(taskDuration * hourHeight, hourHeight); // 限制最大高度为60px

      // 计算任务条的上偏移量，表示任务开始的时间
      const topOffset = (currentHour - taskStart) * hourHeight;

      return {
        height: `${taskHeight}px`,  // 动态设置任务条的高度，不能超过最大高度
        top: `${topOffset}px`,      // 动态设置任务条的上偏移量
        backgroundColor: "lightblue",
        borderRadius: "4px",
        width: "20px",  // 固定宽度
        position: "absolute",
        left: "60px",  // 任务条从右边开始（60px 留给时间段字符）
      };
    },
  },
};
</script>

<style scoped>
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
  left: 60px; /* 任务条距离时间段字符右侧的间距 */
  width: 20px; /* 固定宽度 */
}
</style>


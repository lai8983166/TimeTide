<template>
    <div class="calendar">
      <div class="calendar-header">
        <button @click="changeMonth(-1)">Prev</button>
        <h2>{{ monthNames[currentMonth] }} {{ currentYear }}</h2>
        <button @click="changeMonth(1)">Next</button>
      </div>
      
      <div class="calendar-grid">
        <div v-for="day in getDaysInMonth()" :key="day" class="calendar-day" @click="onDateClicked(day)">
          <span>{{ day }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'Calendar',
    setup() {
      const currentMonth = ref(new Date().getMonth());
      const currentYear = ref(new Date().getFullYear());
      
      const monthNames = ref([
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]);
      
      // 获取当前月的日期数量
      const getDaysInMonth = () => {
        const date = new Date(currentYear.value, currentMonth.value + 1, 0);
        const days = [];
        for (let i = 1; i <= date.getDate(); i++) {
          days.push(i);
        }
        return days;
      };
  
      // 改变月份
      const changeMonth = (increment) => {
        currentMonth.value += increment;
        if (currentMonth.value > 11) {
          currentMonth.value = 0;
          currentYear.value += 1;
        } else if (currentMonth.value < 0) {
          currentMonth.value = 11;
          currentYear.value -= 1;
        }
      };
  
      // 日期点击事件
      const onDateClicked = async (day) => {
        const selectedDate = `${currentYear.value}-${(currentMonth.value + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        alert(`You selected: ${monthNames.value[currentMonth.value]} ${day}, ${currentYear.value}`);

        try {
        // 发送 GET 请求到后端的 getTable API
          const response = await axios.get(`http://localhost:3001/route/gettable`, {
            params: {
              date: selectedDate
            }
          });

          // 处理响应数据
          console.log(response.data); // 你可以在这里使用数据渲染页面等
        } catch (error) {
          console.error('Error fetching table data:', error);
        }
      };
  
      return {
        currentMonth,
        currentYear,
        monthNames,
        getDaysInMonth,
        changeMonth,
        onDateClicked,
      };
    },
  };
  </script>
  
  <style scoped>
  .calendar {
    max-width: 400px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }
  
  .calendar-day {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .calendar-day:hover {
    background-color: #ddd;
  }
  </style>
  
  
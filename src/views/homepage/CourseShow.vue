<template>
  <div class="allCourses">
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <template v-for="(item, index) in semesterArr" :key="item">
        <el-collapse-item :title="item" :name="index">
          <template
            v-for="course in updateCourse[index]"
            :key="course.courseId"
          >
            <div class="rowCard">
              <CourseCard
                @childDeleteCourse="childDeleteCourse"
                @childArchiveCourse="childArchiveCourse(course)"
                :course="course"
                :status="props.status"
              />
            </div>
          </template>
        </el-collapse-item>
      </template>
    </el-collapse>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useCourseStore } from "@/store/course";
import CourseCard from "@/components/homepage/CourseCard";
const props = defineProps({ status: String });
const courseStore = useCourseStore();
let collapseItem = ref(null);
let semesterArr = computed(() => courseStore.semesterArr);
let updateCourse = computed(() => courseStore.updateCourse);
const activeNames = reactive([]);

onMounted(() => {});

const handleChange = (val) => {
  console.log(val);
};
</script>
<style lang="scss" scoped>
::v-deep .el-collapse-item__content {
  display: flex;
  flex-flow: row nowrap;
  .rowCard {
    margin-right: 3vw;
  }
}
</style>

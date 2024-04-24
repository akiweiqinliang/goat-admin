<template>
  <a-row :style="{ display: 'flex' }" :gutter="40">
    <a-col :span="8" :xs="24" :sm="8">
      <a-timeline>
        <a-timeline-item label="2020-04-12" dotColor="#00B42A">
          The first milestone
        </a-timeline-item>
        <a-timeline-item label="2020-05-17">
          The second milestone
        </a-timeline-item>
        <a-timeline-item label="2020-06-22">
          <template #dot>
            <IconClockCircle :style="{ fontSize: '12px', color: '#F53F3F' }" />
          </template>
          The third milestone
        </a-timeline-item>
        <a-timeline-item label="2020-06-22" dotColor="var(--color-fill-4)">
          The third milestone
        </a-timeline-item>
      </a-timeline>
    </a-col>
    <a-col :span="8" :xs="24" :sm="8">
      <a-timeline>
        <a-timeline-item label="2020-04-12">
          <template #dot>
            <IconCheck
                :style="{
              fontSize: '12px',
              padding: '2px',
              boxSizing: 'border-box',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light-1)',
            }"
            />
          </template>
          The first milestone
        </a-timeline-item>
        <a-timeline-item label="2020-05-17">
          <template #dot>
            <IconCheck
                :style="{
              fontSize: '12px',
              padding: '2px',
              boxSizing: 'border-box',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light-1)',
            }"
            />
          </template>
        </a-timeline-item>
        <a-timeline-item label="2020-06-22">The third milestone</a-timeline-item>
        <a-timeline-item label="2020-06-22" dotColor="var(--color-fill-4)">
          The third milestone
        </a-timeline-item>
      </a-timeline>
    </a-col>
    <a-col :span="8" :xs="24" :sm="8">
      <a-timeline>
        <a-timeline-item label="2020-04-12">The first milestone</a-timeline-item>
        <a-timeline-item label="2020-05-17" dotColor="var(--color-fill-4)">
          The second milestone
        </a-timeline-item>
        <a-timeline-item label="2020-06-22" dotColor="var(--color-fill-4)">
          The third milestone
        </a-timeline-item>
      </a-timeline>
    </a-col>
  </a-row>
</template>

<script>
import { IconCheck, IconClockCircle } from '@arco-design/web-vue/es/icon';

export default {
  name: 'TimeLineBox',
  components: { IconCheck, IconClockCircle },
};
</script>

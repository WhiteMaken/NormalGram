<template>
  <span class=date>{{formatDate}}</span>
</template>

<script>
export default {
  name: 'date',
  props: ['date'],
  data() {
    return {
      months: [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
      ]
    }
  },
  computed: {
    formatDate() {
      const newDate = this.date.toString().slice(0, 10).split('-')
      console.log(newDate)
      newDate[1] = this.months[Number(newDate[1]) - 1]
      const month = newDate[1]
      newDate[1] = newDate[2]
      newDate[2] = month
      if (newDate[1] === '1' || newDate[1] === '21' || newDate[1] === '31') {
        newDate[1] = newDate[1] + 'st'
      } else if
      (newDate[1] === '2' || newDate[1] === '22') {
        newDate[1] = newDate[1] + 'nd'
      } else if
      (newDate[1] === '3' || newDate[1] === '23') {
        newDate[1] = newDate[1] + 'rd'
      } else { newDate[1] = newDate[1] + 'th' }

      return newDate
        .reverse()
        .toString()
        .replace(',', ' ')
        .replace(',', ', ')
    }
  }
}
</script>

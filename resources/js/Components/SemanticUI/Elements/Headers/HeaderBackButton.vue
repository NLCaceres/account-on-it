<template>
  <div>
    <h1 class="no-margin">
      <slot></slot>
    </h1>
    <div class="ui divider m-xs-t m-md-b" />
    <back-button :steps-back="-1" />
  </div>
</template>

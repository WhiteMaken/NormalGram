<template>
<div class="responsive">
<div class="gallery">
        <a target="_blank" :href="user.user.avatar">
          <img :src="user.user.avatar"  width="600" height="400"/>
        </a>
        <div class="desc">{{user.user.username}}</div>
        <div class="button_cont"><a class="example_c"  target="_blank"
    to @click="checkProfile(user.user._id)">Check Profile</a></div>
</div>
</div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  props: ['user'],
  mounted() {
    console.log('User:' + this.user.user)
  },
  methods: {

    async checkProfile(id) {
      this.$emit('check-profile', id)
    }
  }

}
</script>

<style scoped>

div.gallery {
  margin: 5px;
  border: 4px solid #494949;
  border-radius: 25px;
  padding: 5px;
}

div.gallery:hover {
  border: 4px solid #000000;
  border-radius: 25px;
}

div.gallery img {
  width: auto;
  height: 100%;
  border: 2px groove black;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

div.desc {
  padding: 15px;
  text-align: center;
  font-weight: bolder;
}

div.desc2{
    text-align: end;
    font-weight: lighter;
}

* {
  box-sizing: border-box;
}

.responsive {
  padding: 0 6px;
  float: left;
  width: 49.99999%;
}

@media only screen and (max-width: 700px) {
  .responsive {
    width: 49.99999%;
    margin: 6px 0;
  }
}

@media only screen and (max-width: 500px) {
  .responsive {
    width: 100%;
  }
}

.clearfix:after {
  content: "";
  display: table;
  clear: both;
}

.example_c {
margin-top: 1em;
margin-bottom: 1em;
margin-right: 3em;
margin-left: 1em;
color: #000000 !important;
text-decoration: none;
background: #ffffff;
padding: 10px;
border: 4px solid #494949 !important;
display: inline-block;
transition: all 0.4s ease 0s;
border-radius: 25px;
display:flex;
justify-content: center;
align-items: center;
}

.example_c:hover {
color: #000000 !important;
background: #ffffff;
border-color: #000000 !important;
transition: all 0.4s ease 0s;
}

.example_c:active{
  background:black;
  color:white !important;
  transition: all 0.1s ease 0s;
}

/*
=====
RESET STYLES
=====
*/

.field__input{
  --uiFieldPlaceholderColor: var(--fieldPlaceholderColor, #767676);

  background-color: transparent;
  border-radius: 0;
  border: none;

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: inherit;
}

.field__input:focus::-webkit-input-placeholder{
  color: var(--uiFieldPlaceholderColor);
}

.field__input:focus::-moz-placeholder{
  color: var(--uiFieldPlaceholderColor);
}

/*
=====
CORE STYLES
=====
*/

.field{
  --uiFieldBorderWidth: var(--fieldBorderWidth, 2px);
  --uiFieldPaddingRight: var(--fieldPaddingRight, 1rem);
  --uiFieldPaddingLeft: var(--fieldPaddingLeft, 1rem);
  --uiFieldBorderColorActive: var(--fieldBorderColorActive, rgba(22, 22, 22, 1));

  display: var(--fieldDisplay, inline-flex);
  position: relative;
  font-size: var(--fieldFontSize, 1rem);
  margin-left: 1px;
  margin-top: 2px;
}

.field__input{
  box-sizing: border-box;
  width: var(--fieldWidth, 100%);
  height: var(--fieldHeight, 3rem);
  padding: var(--fieldPaddingTop, 1.25rem) var(--uiFieldPaddingRight) var(--fieldPaddingBottom, .5rem) var(--uiFieldPaddingLeft);
  border-bottom: var(--uiFieldBorderWidth) solid var(--fieldBorderColor, rgba(0, 0, 0, .25));
}

.field__input:focus{
  outline: none;
}

.field__input::-webkit-input-placeholder{
  opacity: 0;
  transition: opacity .2s ease-out;
}

.field__input::-moz-placeholder{
  opacity: 0;
  transition: opacity .2s ease-out;
}

.field__input:focus::-webkit-input-placeholder{
  opacity: 1;
  transition-delay: .2s;
}

.field__input:focus::-moz-placeholder{
  opacity: 1;
  transition-delay: .2s;
}

.field__label-wrap{
  box-sizing: border-box;
  pointer-events: none;
  cursor: text;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.field__label-wrap::after{
  content: "";
  box-sizing: border-box;
  width: 100%;
  height: 0;
  opacity: 0;

  position: absolute;
  bottom: 0;
  left: 0;
}

.field__input:focus ~ .field__label-wrap::after{
  opacity: 1;
}

.field__label{
  position: absolute;
  left: var(--uiFieldPaddingLeft);
  top: calc(50% - .5em);

  line-height: 1;
  font-size: var(--fieldHintFontSize, inherit);

  transition: top .2s cubic-bezier(0.9, -0.15, 0.1, 1.15), opacity .2s ease-out, font-size .2s ease-out;
  will-change: bottom, opacity, font-size;
}

.field__input:focus ~ .field__label-wrap .field__label,
.field__input:not(:placeholder-shown) ~ .field__label-wrap .field__label{
  --fieldHintFontSize: var(--fieldHintFontSizeFocused, .75rem);

  top: var(--fieldHintTopHover, .25rem);
}

/*
effect 1
*/

.field_v1 .field__label-wrap::after{
  border-bottom: var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive);
  transition: opacity .2s ease-out;
  will-change: opacity;
}

/*
effect 2
*/

.field_v2 .field__label-wrap{
  overflow: hidden;
}

.field_v2 .field__label-wrap::after{
  border-bottom: var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive);
  transform: translate3d(-105%, 0, 0);
  will-change: transform, opacity;
  transition: transform .285s ease-out .2s, opacity .2s ease-out .2s;
}

.field_v2 .field__input:focus ~ .field__label-wrap::after{
  transform: translate3d(0, 0, 0);
  transition-delay: 0;
}

/*
effect 3
*/

.field_v3 .field__label-wrap::after{
  border: var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive);
  will-change: opacity, height;
  transition: height .2s ease-out, opacity .2s ease-out;
}

.field_v3 .field__input:focus ~ .field__label-wrap::after{
  height: 100%;
}

/*
=====
LEVEL 4. SETTINGS
=====
*/

.field{
  --fieldBorderColor: #D1C4E9;
  --fieldBorderColorActive: #673AB7;
}

.like-content {
    display: inline-block;
    width: 100%;
    margin: 40px 0 0;
    padding: 40px 0 0;
    font-size: 18px;
    border-top: 10px dashed #eee;
    text-align: center;
}
.like-content .btn-secondary {
display: block;
margin: 40px auto 0px;
    text-align: center;
    background: #ed2553;
    border-radius: 3px;
    box-shadow: 0 10px 20px -8px rgb(240, 75, 113);
    padding: 10px 17px;
    font-size: 18px;
    cursor: pointer;
    border: none;
    outline: none;
    color: #ffffff;
    text-decoration: none;
    -webkit-transition: 0.3s ease;
    transition: 0.3s ease;
}
.like-content .btn-secondary:hover {
transform: translateY(-3px);
}
.like-content .btn-secondary .fa {
 margin-right: 5px;
}
.animate-like {
animation-name: likeAnimation;
animation-iteration-count: 1;
animation-fill-mode: forwards;
animation-duration: 0.65s;
}
@keyframes likeAnimation {
  0%   { transform: scale(30); }
  100% { transform: scale(1); }
}
</style>

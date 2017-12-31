<template>

    <!-- <div id="dd">
      <canvas id="myCanvas" style="border:1px solid #c3c3c3;">
            Your browser does not support the canvas element.
      </canvas>
    </div> -->
    <div class="panel-main">

      <div class="panel-main__inner panel-inverted">
      <div class="panel-main__content">
          <a href="/" title="link to home of Johannus Vogel">
            <img src="/images/logo.png" class="user-image" alt="My Profile Photo">
            <h1 class="panel-cover__title panel-title">Johannus Vogel</h1>
          </a>
          <hr class="panel-cover__divider">
          <p class="panel-cover__description">Software engineer, artist, entrepreneur and internet poet</p>
          <hr class="panel-cover__divider panel-cover__divider--secondary">

          <div class="navigation-wrapper">
            <transition v-on:enter="enter" appear>
                <nav class="cover-navigation cover-navigation--primary">
                  <ul class="navigation">
                    <li class="navigation__item"><a href="/#blog" title="link to Johannus' blog" class="blog-button">Blog</a></li>
                  </ul>
                </nav>
            </transition>

            <nav class="cover-navigation navigation--social">
              <ul class="navigation">


                <!-- Twitter -->
                <li class="navigation__item">
                  <a href="http://twitter.com/johannus.vogel" title="@johannus.vogel on Twitter" target="_blank">
                    <i class="icon icon-social-twitter"></i>
                    <span class="label">Twitter</span>
                  </a>
                </li>

                <!-- Facebook -->
                <li class="navigation__item">
                  <a href="http://fb.me/johannus.vogel" title="johannus.vogel on Facebook" target="_blank">
                    <i class="icon icon-social-facebook"></i>
                    <span class="label">Facebook</span>
                  </a>
                </li>



                <!-- LinkedIn -->
                <li class="navigation__item">
                  <a href="https://www.linkedin.com/in/johannusvogel" title="johannusvogel on LinkedIn" target="_blank">
                    <i class="icon icon-social-linkedin"></i>
                    <span class="label">LinkedIn</span>
                  </a>
                </li>



                <!-- GitHub -->
                <li class="navigation__item">
                  <a href="https://www.github.com/javogel" title="javogel on GitHub" target="_blank">
                    <i class="icon icon-social-github"></i>
                    <span class="label">GitHub</span>
                  </a>
                </li>



                <!-- Email -->
                <li class="navigation__item">
                  <a href="mailto:johannus.vogel@gmail.com" title="Email johannus.vogel@gmail.com" target="_blank">
                    <i class="icon icon-mail"></i>
                    <span class="label">Email</span>
                  </a>
                </li>


              <!-- RSS -->
              <li class="navigation__item">
                <a href="/feed.xml" title="Subscribe" target="_blank">
                  <i class="icon icon-rss"></i>
                  <span class="label">RSS</span>
                </a>
              </li>

              </ul>
            </nav>

          </div>

        </div>

      </div>

      <div class="panel-cover--overlay"></div>
    </div>
</template>


<!-- <template>
  <div class="copy">
    <h2>{{ siteData.title }}</h2>
    <p v-html="rawdescription"></p>
    <h2>The Best of Both Worlds.</h2>
    <p>{{ siteData.combination }}</p>
    <div class="bennies">
      <div class="benefits">
        <h3>Static Sites</h3>
        <hr>
        <ul>
          <li v-for="benefit in siteData.staticBenefits">{{ benefit | capitalize }}</li>
        </ul>
      </div>
      <div class="benefits">
        <h3>Client-Side JS</h3>
        <hr>
        <ul>
          <li v-for="benefit in siteData.dynamicBenefits">{{ benefit | capitalize }}</li>
          <li v-for="item in newDynamic">{{ item }}</li>
          <li><input label="More great things about static sites"type="" name="" v-model="newItem">
        <button v-on:click="addItem" placeholder="Another benefit">Add</button></li>
        </ul>
      </div>
    </div>
      <p class="environment">*Disable Javascript to see the page rendered with Jekyll.</p>
  </div>
</template> -->

<script>
import siteData from '../_site/data/data.json'
import Marked from 'marked'
export default {
  data () {

    return {
      siteData: siteData,
      newItem: 'Data binding',
      newDynamic: []
    }
  },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      },
      md: function (val) {
          return Marked(val)
      }
  },
  computed: {
    rawdescription: function(){
      return Marked(siteData.description)
    }
  },
  methods: {
    addItem() {
      this.newDynamic.push(this.newItem);
      this.newItem = '';
    },
    enter: function(el,done){

      console.log("I wss here")
      // done();
    }
  }
}
</script>

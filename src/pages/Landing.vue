<template>
  <div>
    <a-row justify="space-between" align="center" class="topHeader">
      <a-avatar class="logo" :size="52">
        <img src="../assets/goat.png" alt="goat"/>
      </a-avatar>
      <a-button class="loginBtn" @click="redirectLogin">Sign in</a-button>
    </a-row>
    <section class="common page-first" ref="pageFirst">
      <div class="linearBg mobile"></div>
      <a-row class="container">
        <a-col :span="13" :xs="24" :sm="24" :md="13">
          <div class="words">
      <span class="title slide-up" ref="desktop1Title">
      “Explore Infinite Possibilities”
    </span>
            <span>
        this is a landing page
      </span>
          </div>
        </a-col>
        <a-col :span="11" :xs="24" :sm="24" :md="11">
          <div class="paintCard" style="margin-left: 80px">
            <div class="paintBox">
              <!--            <img src="http://image-goat.test.upcdn.net/image/503838ldsdl.jpg" alt="first">-->
              <img src="../assets/imgs/landing/desktop1.jpg" alt="first">
            </div>
            <div class="info">
              <div class="title">Charing-Cross Bridge in London</div>
              <div class="date">(circa 1902)</div>
            </div>
          </div>
        </a-col>
      </a-row>

      <a-row class="box-group">
        <div class="box box1"></div>
        <div class="box box2"></div>
        <div class="box box3"></div>
      </a-row>

      <a-row justify="center">
        <div class="dropArrow" @click="handleSlideUp">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="52" viewBox="0 0 16 52" fill="none">
            <path d="M9 1C9 0.447715 8.55228 0 8 0C7.44772 0 7 0.447715 7 1L9 1ZM7.29289 51.7071C7.68342 52.0976 8.31658 52.0976 8.70711 51.7071L15.0711 45.3431C15.4616 44.9526 15.4616 44.3195 15.0711 43.9289C14.6805 43.5384 14.0474 43.5384 13.6569 43.9289L8 49.5858L2.34315 43.9289C1.95262 43.5384 1.31946 43.5384 0.928932 43.9289C0.538408 44.3195 0.538408 44.9526 0.928932 45.3431L7.29289 51.7071ZM7 1L7 51H9L9 1L7 1Z" fill="black"/>
          </svg>
        </div>
      </a-row>
    </section>
    <section class="common page-second">
      <a-row class="container">
        <!--      <img src="http://image-goat.test.upcdn.net/image/Group%209%20right%20img%20box.png" alt="woman" />-->
        <img src="../assets/imgs/landing/desktop2.png" alt="woman" class="pc"/>
        <div class="arrowBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="39" height="16" viewBox="0 0 39 16" fill="none">
            <path d="M1.72794 7.27209C1.17565 7.27209 0.727936 7.71981 0.727936 8.27209C0.727936 8.82438 1.17565 9.27209 1.72794 9.27209V7.27209ZM38.435 8.9792C38.8256 8.58868 38.8256 7.95551 38.435 7.56499L32.0711 1.20103C31.6806 0.810503 31.0474 0.810503 30.6569 1.20103C30.2663 1.59155 30.2663 2.22472 30.6569 2.61524L36.3137 8.27209L30.6569 13.9289C30.2663 14.3195 30.2663 14.9526 30.6569 15.3432C31.0474 15.7337 31.6806 15.7337 32.0711 15.3432L38.435 8.9792ZM1.72794 9.27209L37.7279 9.27209V7.27209L1.72794 7.27209V9.27209Z" fill="black"/>
          </svg>
        </div>
        <div class="imgCover mobile"></div>
        <img src="../assets/imgs/landing/m-desktop2.jpg" alt="woman" class="mobile"/>
        <a-col :span="10" class="textBox" :xs="24" :sm="24" :md="10">
        <span>
          This is my favorite one
        </span>
          <span>
          Woman with a Parasol – Madame Monet and Her Son (1875)
        </span>
          <p>
            Oscar-Claude Monet was a French painter and founder of impressionist painting who is seen as a key precursor to modernism, especially in his attempts to paint nature as he perceived it. During his long career, he was the most consistent and prolific practitioner of impressionism's philosophy of expressing one's perceptions before
            nature,especially as applied to plein air (outdoor) landscape painting. The term "Impressionism" is derived from the title of his painting Impression, soleil levant, exhibited in the 1874 ("exhibition of rejects") initiated by Monet and his associates as an alternative to the Salon.
          </p>
        </a-col>
      </a-row>
    </section>
    <section class="common page-third">
      <div class="linearBg3 mobile"></div>
      <a-row class="container">
        <svg xmlns="http://www.w3.org/2000/svg" width="151" height="16" viewBox="0 0 151 16" fill="none">
          <path d="M150.707 8.70711C151.098 8.31658 151.098 7.68342 150.707 7.29289L144.343 0.928932C143.953 0.538408 143.319 0.538408 142.929 0.928932C142.538 1.31946 142.538 1.95262 142.929 2.34315L148.586 8L142.929 13.6569C142.538 14.0474 142.538 14.6805 142.929 15.0711C143.319 15.4616 143.953 15.4616 144.343 15.0711L150.707 8.70711ZM0 9H150V7H0V9Z" fill="white"/>
        </svg>
        <a-col :span="10" :xs="0" :sm="0" :md="10">
          <div  ref="mouseOverContainer" class="mouseContainer">
            <div class="paintCard mouseElement" ref="element">
              <div class="paintBox">
                <!--            <img src="http://image-goat.test.upcdn.net/image/503832ldsdl.jpg" alt="first">-->
                <img src="../assets/imgs/landing/desktop3.jpg" alt="first">
              </div>
              <div class="info">
                <div class="title">A Seascape, Shipping by Moonlight</div>
                <div class="date">(1864)</div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="0" :xs="24" :sm="24" :md="0" class="mobile">
          <div class="paintCard">
            <div class="paintBox">
              <!--            <img src="http://image-goat.test.upcdn.net/image/503832ldsdl.jpg" alt="first">-->
              <img src="../assets/imgs/landing/desktop3.jpg" alt="first">
            </div>
            <div class="info">
              <div class="title">A Seascape, Shipping by Moonlight</div>
              <div class="date">(1864)</div>
            </div>
          </div>
        </a-col>
        <a-col :span="14" :xs="24" :sm="24" :md="14">
          <ul class="cardList">
            <li class="cardItem">
              <span>Medium</span>
              <span>oil on canvas</span>
            </li>
            <li class="cardItem">
              <span>Measurements</span>
              <span>H 60 x W 73.8 cm</span>
            </li>
            <li class="cardItem">
              <span>Acquisition method</span>
              <span>purchased, 1980</span>
            </li>
            <li class="cardItem">
              <span>Accession number</span>
              <span>NG 2399</span>
            </li>
          </ul>
        </a-col>

      </a-row>
    </section>
    <section class="common page-fourth">
      <a-row class="container">

        <a-col :span="10" class="left" :xs="24" :sm="12" :md="14" :lg="10">
        <span>
          Find Your Favorite
          <svg xmlns="http://www.w3.org/2000/svg" width="187" height="18" viewBox="0 0 187 18" fill="none">
            <path d="M3.8364 11.3724C74.3361 0.0532548 113.743 0.839783 183.809 14.5138" stroke="url(#paint0_linear_63_434)" stroke-width="6" stroke-linecap="round"/>
            <defs>
              <linearGradient id="paint0_linear_63_434" x1="3.9182" y1="6.68619" x2="183.891" y2="9.82762" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8EB4ED"/>
                <stop offset="0.405" stop-color="#8EB4ED"/>
                <stop offset="1" stop-color="#8EB4ED" stop-opacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </span>
          <a-col :span="0" :xs="24" :sm="0" :md="0" :lg="0" class="mbright">
            <swiper
                ref="slider"
                @swiper="onSwiper"
                style="margin: auto"
                :effect="'flip'"
                :grabCursor="true"
                :navigation="true"
                :modules="modules"
                :mousewheel="true"
                class="mySwiper"
                :pagination="{
      type: 'fraction',
    }"
            >
              <a-row class="navigationBtnBox">
                <a-button class="navigationBtn" shape="circle" @click="slider.slidePrev()">
                  <icon-caret-left />
                </a-button>
                <a-button class="navigationBtn" shape="circle" @click="slider.slideNext()">
                  <icon-caret-right />
                </a-button>
              </a-row>
              <swiper-slide v-for="item in imgList" style="color: black">
                <div class="paintCard" style="margin: 40px auto; width: auto;">
                  <div class="paintBox">
                    <img :src="item.url" alt="item.url"/>
                  </div>
                  <div class="info">
                    <div class="title">Charing-Cross Bridge in London</div>
                    <div class="date">(circa 1902)</div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </a-col>
          <p>
            Monet left behind 500 sketches, more than 2,000 oil paintings and 2,700 letters during his lifetime. His footprints ranged from the streets of Paris to the shores of the Mediterranean, from France to London, Venice, and Norway. He traveled and sketched in various places, leaving behind countless works.
          </p>
          <a-row justify="end">
            <div class="exploreBtn">
              <div class="explore">
                Explore
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="16" viewBox="0 0 31 16" fill="none">
                  <path d="M30.7071 8.70711C31.0976 8.31658 31.0976 7.68342 30.7071 7.29289L24.3431 0.928932C23.9526 0.538408 23.3195 0.538408 22.9289 0.928932C22.5384 1.31946 22.5384 1.95262 22.9289 2.34315L28.5858 8L22.9289 13.6569C22.5384 14.0474 22.5384 14.6805 22.9289 15.0711C23.3195 15.4616 23.9526 15.4616 24.3431 15.0711L30.7071 8.70711ZM0 9H30V7H0V9Z" fill="white"/>
                </svg>
              </div>
            </div>
          </a-row>
        </a-col>
        <a-col :span="14" :xs="0" :sm="0" :md="0" :lg="14" class="right">
          <div class="first">
            <div class="imgList">
              <div class="imgItem" v-for="item in imgList">
                <!--              <img :src="item.url" alt="1" />-->
                <div class="paintCard">
                  <div class="paintBox">
                    <img :src="item.url" alt="item.url"/>
                  </div>
                  <div class="info">
                    <div class="title">Charing-Cross Bridge in London</div>
                    <div class="date">(circa 1902)</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="imgList2">
              <div class="imgItem" v-for="item in imgList">
                <!--              <img :src="item.url" alt="1" />-->
                <div class="paintCard">
                  <div class="paintBox">
                    <img :src="item.url" alt="item.url"/>
                  </div>
                  <div class="info">
                    <div class="title">Charing-Cross Bridge in London</div>
                    <div class="date">(circa 1902)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="second">
            <div class="imgList">
              <div class="imgItem" v-for="item in imgList2">
                <!--              <img :src="item.url" alt="1" />-->
                <div class="paintCard">
                  <div class="paintBox">
                    <img :src="item.url" alt="item.url"/>
                  </div>
                  <div class="info">
                    <div class="title">Charing-Cross Bridge in London</div>
                    <div class="date">(circa 1902)</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="imgList2">
              <div class="imgItem" v-for="item in imgList2">
                <!--              <img :src="item.url" alt="1" />-->
                <div class="paintCard">
                  <div class="paintBox">
                    <img :src="item.url" alt="item.url"/>
                  </div>
                  <div class="info">
                    <div class="title">Charing-Cross Bridge in London</div>
                    <div class="date">(circa 1902)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="0" :xs="0" :sm="12" :md="10" :lg="0" class="mbright">
          <swiper
              ref="slider"
              @swiper="onSwiper"
              style="margin: auto"
              :effect="'flip'"
              :grabCursor="true"
              :navigation="true"
              :modules="modules"
              :mousewheel="true"
              class="mySwiper"
              :pagination="{
      type: 'fraction',
    }"
          >
            <a-row class="navigationBtnBox">
              <a-button class="navigationBtn" shape="circle" @click="slider.slidePrev()">
                <icon-caret-left />
              </a-button>
              <a-button class="navigationBtn" shape="circle" @click="slider.slideNext()">
                <icon-caret-right />
              </a-button>
            </a-row>
            <swiper-slide v-for="item in imgList" style="color: black">
              <div class="paintCard" style="margin: 40px auto; width: auto;">
                <div class="paintBox">
                  <img :src="item.url" alt="item.url"/>
                </div>
                <div class="info">
                  <div class="title">Charing-Cross Bridge in London</div>
                  <div class="date">(circa 1902)</div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </a-col>
      </a-row>
    </section>
    <section class="common page-fifth">
      <img src="../assets/imgs/landing/desktop5-2.png" alt="fifth page" />
      <a-row class="upper">
        <a-col :span="10" :xs="0" :sm="0" :md="0" :lg="6" :xl="10"></a-col>
        <a-col :span="14" :xs="24" :sm="24" :md="24" :lg="18" :xl="14">
          <a-row class="container">
            <a-col class="title">
              You have read everything above the landing page
            </a-col>
            <a-col class="desc">
              Thank you for visiting my website. If you are interested in my services, please contact me today for more information.By the way, the current webpage is only used to display Monet's works. Please log in to your account to experience other functions.
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row class="footer">
        <a-col :span="10" class="inputContainer" :xs="24" :sm="24" :md="24" :lg="10">
          <a-input class="footerInput" placeholder="Please leave your email"></a-input>
          <a-button class="sendBtn">send</a-button>
        </a-col>
        <a-col :span="14" :xs="24" :sm="24" :md="24" :lg="14">
          <a-row class="container">
            <a-col :span="8">
              <span class="footerTitle">support</span>
              <ul>
                <li>Cantact Us</li>
                <li>Blog</li>
                <li>Privacy Policy</li>
              </ul>
            </a-col>
            <a-col :span="8">
              <span class="footerTitle">About</span>
              <ul>
                <li>Who We Are</li>
                <li>Leadership</li>
                <li>News</li>
              </ul>
            </a-col>
            <a-col :span="8">
              <span class="footerTitle">Resources</span>
              <ul>
                <li>Main Image</li>
                <li>Other Image</li>
                <li>Introduction To Monet</li>
              </ul>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row class="endBox">
        <a-divider class="endDivider"/>
        <a-row justify="space-between" align="center" class="fullWidth">
        <span>
        Copyright ©️2023 akiweiqinliang
      </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6.51734 17.1132C6.91177 17.6905 8.10883 18.9228 9.74168 19.2333M9.86428 22C8.83582 21.8306 2 19.6057 2 12.0926C2 5.06329 8.0019 2 12.0008 2C15.9996 2 22 5.06329 22 12.0926C22 19.6057 15.1642 21.8306 14.1357 22C14.1357 22 13.9267 18.5826 14.0487 17.9969C14.1706 17.4113 13.7552 16.4688 13.7552 16.4688C14.7262 16.1055 16.2043 15.5847 16.7001 14.1874C17.0848 13.1032 17.3268 11.5288 16.2508 10.0489C16.2508 10.0489 16.5318 7.65809 15.9996 7.56548C15.4675 7.47287 13.8998 8.51192 13.8998 8.51192C13.4432 8.38248 12.4243 8.13476 12.0018 8.17939C11.5792 8.13476 10.5568 8.38248 10.1002 8.51192C10.1002 8.51192 8.53249 7.47287 8.00036 7.56548C7.46823 7.65809 7.74917 10.0489 7.74917 10.0489C6.67316 11.5288 6.91516 13.1032 7.2999 14.1874C7.79575 15.5847 9.27384 16.1055 10.2448 16.4688C10.2448 16.4688 9.82944 17.4113 9.95135 17.9969C10.0733 18.5826 9.86428 22 9.86428 22Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a-row>
      </a-row>
    </section>
  </div>

















</template>

<script>
import { annotate } from 'rough-notation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import ScrollReveal from "scrollreveal";
import { IconCaretLeft, IconCaretRight } from "@arco-design/web-vue/es/icon";
import { FreeMode, EffectFlip, Scrollbar, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';

import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
 export default {
   name: "Landing",
   components: {
     Swiper,
     SwiperSlide,
     IconCaretLeft,
     IconCaretRight
   },
   setup() {
     function handleSlideUp () {
       const pageFirst = document.querySelector('.page-first');
       window.scrollTo({
         top: window.innerHeight,
         behavior: "smooth"
       });
     }
    const customSTyle = () => {
      const slideUp = {
        distance: '150%',
        origin: 'bottom',
        opacity: null,
      };
      ScrollReveal().reveal('.slide-up', slideUp)
    }
     const desktop1Title = ref(null)
     const desktop1Play = () => {
       const annotation = annotate(desktop1Title.value, { type: "highlight" })
       annotation.show()
       annotation.animate = true;
     }
     const slider = ref(null);
     const onSwiper = (swiper) => {
       slider.value = swiper;
     };

     const router = useRouter()
     const imgList = [
       {
         url: 'src/assets/imgs/landing/paint/01.jpg',
       }, {
         url: 'src/assets/imgs/landing/paint/02.jpeg',
       }, {
         url: 'src/assets/imgs/landing/paint/03.jpg',
       }, {
         url: 'src/assets/imgs/landing/paint/04.jpeg',
       }, {
         url: 'src/assets/imgs/landing/paint/01.jpg',
       }, {
         url: 'src/assets/imgs/landing/paint/02.jpeg',
       }, {
         url: 'src/assets/imgs/landing/paint/03.jpg',
       }, {
         url: 'src/assets/imgs/landing/paint/04.jpeg',
       },
     ];
     const imgList2 = [
       {
         url: 'src/assets/imgs/landing/paint/05.jpeg',
       }, {
         url: 'src/assets/imgs/landing/paint/06.jpg',
       }, {
         url: 'src/assets/imgs/landing/paint/07.jpeg',
       }, {
         url: 'src/assets/imgs/landing/paint/08.jpeg',
       }, {
         url: 'src/assets/imgs/landing/paint/05.jpeg',
       }, {
         url: 'src/assets/imgs/landing/paint/06.jpg',
       }, {
         url: 'src/assets/imgs/landing/paint/07.jpeg',
       }, {
         url: 'src/assets/imgs/landing/paint/08.jpeg',
       },
     ];
     const redirectLogin = () => {
       router.push({
         name: 'login'
       })
     }
     const mouseOverContainer = ref(null)
     const element = ref(null)
     const multiple = 10;
     function transformElement(x, y) {
       let box = element.value.getBoundingClientRect();
       const calcX = -(y - box.y - box.height / 2) / multiple;
       const calcY = (x - box.x - box.width / 2) / multiple;
       const percentage = parseInt((x - box.x) / box.width * 1000) / 10;

       element.value.style.transform = "rotateX(" + calcX + "deg) " + "rotateY(" + calcY + "deg)";
     }
     onMounted(() => {
       // desktop1Play()
       customSTyle()
       mouseOverContainer.value.addEventListener('mousemove', (e) => {
         window.requestAnimationFrame(function () {
           transformElement(e.clientX, e.clientY);
         });
       });
       mouseOverContainer.value.addEventListener('mouseleave', (e) => {
         window.requestAnimationFrame(function () {
           element.value.style.transform = "rotateX(0) rotateY(0)";
         });
       });

     })

     return {
       imgList,
       imgList2,
       modules: [EffectFlip,Navigation, Pagination, Mousewheel],
       mouseOverContainer,
       element,
       redirectLogin,
       // swiper,
       slider,
       onSwiper,
       handleSlideUp,
       desktop1Title
     }
   }
 }
</script>

<style scoped lang="scss">
.mobile{
  display: none;
}
.scroll-box{
  height: 150px;
  width: 100px;
  //overflow: hidden;
  .content-box{
    display: flex;
    img{
      height: 150px;
      width: 210px;
    }
  }
}

.paintCard{
  //width: 360px;
  width: 25vw;
  min-width: 240px;
  aspect-ratio: 360 / 460;
  background: white;
  border-radius: 8px;
  box-sizing: border-box;
  //margin-left: 80px;
  position: relative;
  padding: 12px;
  .paintBox{
    width: 100%;
    aspect-ratio: 337 / 347;
    overflow: hidden;
    img{
      height: 100%;
    }
  }
  .info{
    text-align: end;
    font-size: 14px;
    font-weight: bold;
    margin-top: 34px;
  }
}
.topHeader{
  z-index: 99;
  backdrop-filter: blur(4px);
  height: 64px;
  padding: 0 20px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.3);
  position: fixed;
  width: 100vw;
  top: 0;
  .logo{
    background: white;
    padding: 4px;
  }
  .loginBtn{
    width: 100px;
    height: 40px;
    border: 2px solid black;
    border-radius: 8px;
    background: white;
    color: black;
    font-weight: bold;
    font-size: 14px;
    position: relative;
  }
  .loginBtn::after{
    content: '';
    position: absolute;
    width: 88px;
    height: 28px;
    top: 2px;
    left: 2px;
    border: 2px solid black;
    border-radius: 8px;
  }
}
.common{
  min-height: 100vh;
  //overflow: hidden;
  overflow-x: hidden;
}
.page-first{
  //background-image: url("http://image-goat.test.upcdn.net/image/503838ldsdl.jpg");
  background-image: url("../assets/imgs/landing/desktop1.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  .container{
    box-sizing: border-box;
    width: 100%;
    padding: 0 7.3%;
    top: 21.9%;
    position: absolute;
    z-index: 10;
    .words{
      color: white;
      font-weight: bold;
      text-align: end;
      span{
        font-size: 24px;
      }
      .title{
        display: block;
        text-align: left;
        font-size: 48px;
      }
    }
    .paintCard{
      ::after{
        content: '';
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: white;
        bottom: -40px;
        left: -40px;
      }
    }
  }
  .box-group{
    //position: relative;
    .box{
      background: white;
      opacity: 0.3;
      position: absolute;
      border-radius: 8px;
    }
    .box1{
      width: 20.8%;
      aspect-ratio: 5 / 6;
      top: 33.6%;
      left: 16.9%;
    }
    .box2{
      width: 41.7%;
      aspect-ratio: 6 / 5;
      top: 11.8%;
      left: 29.2%;
    }
    .box3 {
      width: 41.7%;
      aspect-ratio: 3 / 2;
      top: 42.1%;
      left: 51.67%;
    }
  }
  .dropArrow{
    width: 108px;
    height: 108px;
    border-radius: 50%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 5%;
    cursor: pointer;
  }
}
.page-second{
  .container{
    width: 100%;
    height: 100vh;
    position: relative;
    img{
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      z-index: -1;
    }
    .arrowBtn{
      width: 70px;
      height: 70px;
      position: absolute;
      background: white;
      border-radius: 50%;
      right: 20px;
      bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .textBox{
      padding: 18.2% 20px 0 3.2%;
      height: 100%;
      background: white;
      span{
        font-weight: bold;
        font-size: 20px;
        display: block;

      }
      span:nth-child(1){
        color: #2A58B3;
        font-size: 48px;
        margin-bottom: 30px;
      }
      p{
        margin-top: 70px;
        font-size: 20px;
        line-height: 28px;
      }
    }
  }
}
.page-third{
  //background-image: url("http://image-goat.test.upcdn.net/image/Desktop%20-%203.png");
  background-image: url("../assets/imgs/landing/desktop3bg.png");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8.26%;
  .container{
    width: 100%;
    position: relative;
    svg{
      position: absolute;
      right: 0;
      bottom: -40px;
    }
  }
  .paintCard{
    ::after{
      content: '';
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: white;
      bottom: -40px;
      right: -40px;
    }
  }

  .cardList{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    .cardItem{
      width: calc(100% / 2 - 10px);
      aspect-ratio: 350 / 278;
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      span{
        color: white;
        font-size: 36px;
        display: block;
      }
      span:nth-child(1){
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 16px;
      }
    }
    .cardItem:nth-child(1), .cardItem:nth-child(2){
      margin-bottom: 20px;
    }
    .cardItem:nth-child(1), .cardItem:nth-child(3){
      margin-right: 20px;
    }
  }
}
.page-fourth{
  background: black;
  color: white;
  .container{
    padding: 0 70px;
    .left{
      padding: 19% 70px 0 0;
      span{
        font-size: 48px;
        font-weight: bold;
        position: relative;
        svg{
          position: absolute;
          bottom: -20px;
          right: -8px;
        }
      }
      p{
        margin: 70px 0;
        line-height: 28px;
        font-size: 20px;
      }
      .exploreBtn{
        width: 246px;
        border-radius: 40px;
        height: 58px;
        border: 2px solid white;
        position: relative;
        z-index: 8;
        cursor: pointer;
        .explore{
          width: 100%;
          border-radius: 40px;
          height: 100%;
          font-size: 20px;
          background: black;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        svg{
          position: absolute;
          right: 20%;
          transition: all .3s;
        }
        &:hover svg{
          transform: translateX(10px);
          transition: all .3s;
        }
        &::before{
          content: '';
          width: 100%;
          border-radius: 40px;
          height: 100%;
          position: absolute;
          background: white;
          bottom: 0;
          right: 0;
          z-index: -1;
          transition: all .3s;
        }
        &:hover::before{
          bottom: -10px;
          right: -4px;
          transition: all .3s;
        }
      }
    }
    .right{
      height: 100vh;
      overflow: hidden;
      display: flex;
      justify-content: end;
      width: 100%;
      .first, .second{
        width: calc(50% - 10px);
        //transform: rotate(20deg);
      }
      .first{
        margin-right: 10px;
      }
      .second{
        margin-left: 10px;
        //transform: rotate(20deg) translateX(20px);
      }
      .imgList, .imgList2{
        width: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        .paintCard{
          width: 100%;
          margin-bottom: 20px;
          color: black;
        }
        .paintCard:hover{

        }
      }
    }
  }
  .navigationBtnBox{
    position: relative;
    z-index: 11;
    margin-left: 30px;
    .navigationBtn{
      background: black;
      color: white;
      margin-right: 10px;
      border: 1px solid white;
    }
  }
}
.page-fifth{
  //overflow: hidden;
  position: relative;
  img{
    position: absolute;
    left: 0;
    top: 0;
    object-fit: cover;
    width: 100%;
    max-width: max-content;
    z-index: -1;
    transform: scaleX(1.05);
  }
  .upper{
    padding-top: 40vh;
    //margin-top: 40vh;
  }
  .container{
    padding: 0 100px;
    .title{
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 40px;
    }
    .desc{
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 110px;
    }
  }
  .inputContainer{
    padding-left: 100px;
    display: flex;
    flex-wrap: nowrap;
    .footerInput{
      width: 400px;
      height: 64px;
      border: 2px solid black;
      border-radius: 8px;
      background: white;
      color: black;
      font-weight: bold;
      font-size: 14px;
      position: relative;
    }
    .footerInput::after{
      content: '';
      position: absolute;
      width: calc(100% - 12px);
      height: 48px;
      top: 4px;
      left: 4px;
      border: 2px solid black;
      border-radius: 8px;
    }
    .sendBtn{
      width: 108px;
      height: 64px;
      color: white;
      background: black;
      font-weight: bold;
      font-size: 20px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20px;
    }
  }
  .footer{
    display: flex;
    align-items: center;
    span{
      font-size: 16px;
      font-weight: bold;
    }
    ul{
      list-style: none;
      margin: 0;
      padding: 0;
      margin-top: 30px;
      li{
        font-size: 16px;
        margin-bottom: 16px;
      }
    }
  }

  .endBox{
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    //position: absolute;
    //position: sticky;
    margin-bottom: 10px;
    svg{
      fill: rgba(0, 0, 0, 1);
    }
    .endDivider{
      margin-bottom: 10px;
    }
  }
}

.fullWidth{
  width: 100%;
}
.page-fourth{
  .first{
    .imgList{
      animation: scrollBanner 18s linear infinite;
    }
    .imgList2{
      animation: scrollBanner2 18s linear infinite;
    }
  }
  .second{
    .imgList{
      animation: scrollBanner3 36s linear infinite;
    }
    .imgList2{
      animation: scrollBanner4 36s linear infinite;
    }
  }
}
@keyframes scrollBanner {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-50%);
  }
}
@keyframes scrollBanner2 {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(-100%);
  }
}
@keyframes scrollBanner3 {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  }
}
@keyframes scrollBanner4 {
  0% {
    transform: translateY(-200%);
  }
  100% {
    transform: translateY(-100%);
  }
}
@import "../assets/css/landingMediaScreen.scss";

.mouseContainer{
  transform-style: preserve-3d;
  perspective: 500px;
  .mouseElement{
    transform-style: preserve-3d;
    transition: all .1s;
  }
}
</style>

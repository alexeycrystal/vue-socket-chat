<template>
  <div id="profile">
    <div class="wrap">
      <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" class="online" alt="" />
      <p>Mike Ross</p>
      <i class="fa fa-chevron-down expand-button" aria-hidden="true"></i>
      <div id="status-options">
        <ul>
          <li id="status-online" class="active"><span class="status-circle"></span> <p>Online</p></li>
          <li id="status-away"><span class="status-circle"></span> <p>Away</p></li>
          <li id="status-busy"><span class="status-circle"></span> <p>Busy</p></li>
          <li id="status-offline"><span class="status-circle"></span> <p>Offline</p></li>
        </ul>
      </div>
      <div id="expanded">
        <label for="twitter"><i class="fa fa-facebook fa-fw" aria-hidden="true"></i></label>
        <input name="twitter" type="text" value="mikeross" />
        <label for="twitter"><i class="fa fa-twitter fa-fw" aria-hidden="true"></i></label>
        <input name="twitter" type="text" value="ross81" />
        <label for="twitter"><i class="fa fa-instagram fa-fw" aria-hidden="true"></i></label>
        <input name="twitter" type="text" value="mike.ross" />
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ProfileHeader"
    }
</script>

<style scoped>
  #frame #sidepanel #profile {
    width: 80%;
    margin: 25px auto;
  }
  @media screen and (max-width: 735px) {
    #frame #sidepanel #profile {
      width: 100%;
      margin: 0 auto;
      padding: 5px 0 0 0;
      background: #32465a;
    }
  }
  #frame #sidepanel #profile.expanded .wrap {
    height: 210px;
    line-height: initial;
  }
  #frame #sidepanel #profile.expanded .wrap p {
    margin-top: 20px;
  }
  #frame #sidepanel #profile.expanded .wrap i.expand-button {
    -moz-transform: scaleY(-1);
    -o-transform: scaleY(-1);
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
  }
  #frame #sidepanel #profile .wrap {
    height: 60px;
    line-height: 60px;
    overflow: hidden;
    -moz-transition: 0.3s height ease;
    -o-transition: 0.3s height ease;
    -webkit-transition: 0.3s height ease;
    transition: 0.3s height ease;
  }
  @media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap {
      height: 55px;
    }
  }
  #frame #sidepanel #profile .wrap img {
    width: 50px;
    border-radius: 50%;
    padding: 3px;
    border: 2px solid #e74c3c;
    height: auto;
    float: left;
    cursor: pointer;
    -moz-transition: 0.3s border ease;
    -o-transition: 0.3s border ease;
    -webkit-transition: 0.3s border ease;
    transition: 0.3s border ease;
  }
  @media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap img {
      width: 40px;
      margin-left: 4px;
    }
  }
  #frame #sidepanel #profile .wrap img.online {
    border: 2px solid #2ecc71;
  }
  #frame #sidepanel #profile .wrap img.away {
    border: 2px solid #f1c40f;
  }
  #frame #sidepanel #profile .wrap img.busy {
    border: 2px solid #e74c3c;
  }
  #frame #sidepanel #profile .wrap img.offline {
    border: 2px solid #95a5a6;
  }
  #frame #sidepanel #profile .wrap p {
    float: left;
    margin-left: 15px;
  }
  @media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap p {
      display: none;
    }
  }
  #frame #sidepanel #profile .wrap i.expand-button {
    float: right;
    margin-top: 23px;
    font-size: 0.8em;
    cursor: pointer;
    color: #435f7a;
  }
  @media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap i.expand-button {
      display: none;
    }
  }
  #frame #sidepanel #profile .wrap #status-options {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    width: 150px;
    margin: 70px 0 0 0;
    border-radius: 6px;
    z-index: 99;
    line-height: initial;
    background: #435f7a;
    -moz-transition: 0.3s all ease;
    -o-transition: 0.3s all ease;
    -webkit-transition: 0.3s all ease;
    transition: 0.3s all ease;
  }
  @media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap #status-options {
      width: 58px;
      margin-top: 57px;
    }
  }
  #frame #sidepanel #profile .wrap #status-options.active {
    opacity: 1;
    visibility: visible;
    margin: 75px 0 0 0;
  }
  @media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap #status-options.active {
      margin-top: 62px;
    }
  }
  #frame #sidepanel #profile .wrap #status-options:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid #435f7a;
    margin: -8px 0 0 24px;
  }
  @media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap #status-options:before {
      margin-left: 23px;
    }
  }
  #frame #sidepanel #profile .wrap #status-options ul {
    overflow: hidden;
    border-radius: 6px;
  }
  #frame #sidepanel #profile .wrap #status-options ul li {
    padding: 15px 0 30px 18px;
    display: block;
    cursor: pointer;
  }
  @media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap #status-options ul li {
      padding: 15px 0 35px 22px;
    }
  }
  #frame #sidepanel #profile .wrap #status-options ul li:hover {
    background: #496886;
  }
  #frame #sidepanel #profile .wrap #status-options ul li span.status-circle {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 5px 0 0 0;
  }
  @media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap #status-options ul li span.status-circle {
      width: 14px;
      height: 14px;
    }
  }
  #frame #sidepanel #profile .wrap #status-options ul li span.status-circle:before {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    margin: -3px 0 0 -3px;
    background: transparent;
    border-radius: 50%;
    z-index: 0;
  }
  @media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap #status-options ul li span.status-circle:before {
      height: 18px;
      width: 18px;
    }
  }
  #frame #sidepanel #profile .wrap #status-options ul li p {
    padding-left: 12px;
  }
  @media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap #status-options ul li p {
      display: none;
    }
  }
  #frame #sidepanel #profile .wrap #status-options ul li#status-online span.status-circle {
    background: #2ecc71;
  }
  #frame #sidepanel #profile .wrap #status-options ul li#status-online.active span.status-circle:before {
    border: 1px solid #2ecc71;
  }
  #frame #sidepanel #profile .wrap #status-options ul li#status-away span.status-circle {
    background: #f1c40f;
  }
  #frame #sidepanel #profile .wrap #status-options ul li#status-away.active span.status-circle:before {
    border: 1px solid #f1c40f;
  }
  #frame #sidepanel #profile .wrap #status-options ul li#status-busy span.status-circle {
    background: #e74c3c;
  }
  #frame #sidepanel #profile .wrap #status-options ul li#status-busy.active span.status-circle:before {
    border: 1px solid #e74c3c;
  }
  #frame #sidepanel #profile .wrap #status-options ul li#status-offline span.status-circle {
    background: #95a5a6;
  }
  #frame #sidepanel #profile .wrap #status-options ul li#status-offline.active span.status-circle:before {
    border: 1px solid #95a5a6;
  }
  #frame #sidepanel #profile .wrap #expanded {
    padding: 100px 0 0 0;
    display: block;
    line-height: initial !important;
  }
  #frame #sidepanel #profile .wrap #expanded label {
    float: left;
    clear: both;
    margin: 0 8px 5px 0;
    padding: 5px 0;
  }
  #frame #sidepanel #profile .wrap #expanded input {
    border: none;
    margin-bottom: 6px;
    background: #32465a;
    border-radius: 3px;
    color: #f5f5f5;
    padding: 7px;
    width: calc(100% - 43px);
  }
  #frame #sidepanel #profile .wrap #expanded input:focus {
    outline: none;
    background: #435f7a;
  }
</style>

$(function(){
    function App(){
        this.container = $('.container');
        this.video = $('#video');
    }
    App.prototype = {
        init: function(){
            this.createPlayer();
        },
        setSrc: function(url){
            var src = url || 'm3u8/index.m3u8';
            this.video.attr({
                'src': src,
                'width': this.getSize().w,
                'height': this.getSize().h
            });
        },
        createPlayer: function(){            
            var url = 'http://inlive.jiuyan.info/recordings/z1.inlive.57e4dec05e77b02a3105e375/in/2016/09/23/160D6497-6272-3507-A963-64D318118536-1aVqjQyB.m3u8';
            // var url = 'http://pili-live-hls.live.in66.com/inlive/57e4e3275e77b02a3105f186.m3u8';
            this.setSrc(url);
            this.setStyle();
            window.player = this.player = new MediaElementPlayer(this.video, {
                videoWidth: this.getSize().w,
                videoHeight: this.getSize().h,
                success: function(media){
                    media.play();
                    media.addEventListener('ended', function() {
                        console.log('end')
                        try {
                            this.video.removeAttr('src')
                            this.player.controls.addClass('mejs-offscreen');
                        } catch (e) {}
                    }.bind(this));

                    media.addEventListener('pause', function() {
                        console.log('pause')
                    }.bind(this));

                    this.pause();
                    this.play();
                }.bind(this),
                error: function(media) {
                    console.log('error')
                }.bind(this)
            })
        },
        getSize: function(w, h){
            var winW = $(window).width();
            var winH = $(window).height();
            var winScale = winW / winH;

            var videoW = w || 480;
            var videoH = h || 848;
            var videoScale = videoW / videoH;

            if(videoScale > winScale){
                videoW = winW;
                videoH = winW / videoScale;
            }else{
                videoH = winH;
                videoW = winH * videoScale;
            }
            return {
                'w': videoW,
                'h': videoH
            }
        },
        setStyle: function(){
            this.container.css({
                'margin-left': -this.getSize().w / 2,
                'margin-top': -this.getSize().h / 2
            });
        },
        play: function(){
            $('#play').on('click', function(){
                try{
                    window.player.play();
                }catch(e){
                    alert(e)
                }
            })
            // .trigger('click')
        },
        pause: function(){
            $('#pause').on('click', function(){
                try{
                    window.player.pause();
                }catch(e){
                    alert(e)
                }
            })
        }
    }
    window.App = App;
    new App().init();
})
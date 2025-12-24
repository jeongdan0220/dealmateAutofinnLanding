$(function () {
    headerEvent();
    motionChecker();
    faqAccordion();
});
$(window).scroll(function () {
    motionChecker();
});
window.onload = function() {
}

/* ======================================
 * header event
 * ====================================== */
function headerEvent() {
    const $header = $('#header');
    const $target = $('.section_process');

    if ($target.length === 0) return;

    function toggleHeaderClass() {
        const scrollTop = $(window).scrollTop();
        const targetTop = $target.offset().top - 200;

        if (scrollTop >= targetTop) {
            $header.addClass('light');
        } else {
            $header.removeClass('light');
        }
    }
    toggleHeaderClass();
    $(window).on('scroll', toggleHeaderClass);
}

/* ======================================
 * motion checker
 * ====================================== */
function motionChecker() {
    var scrollTopRatio;
    function getScrollTop() {
        if (document.scrollingElement && document.scrollingElement.scrollHeight) {
            scrollTopRatio = $(document).height() / document.scrollingElement.scrollHeight;
        } else {
            scrollTopRatio = 1;
        }
        return $(window).scrollTop() * scrollTopRatio;
    }

    $('.motion').each(function (index) {
        var pos = $(this).offset(),
            wY  = getScrollTop(),
            wH  = $(window).height(),
            oH  = $(this).outerHeight();
        var posTop = pos.top;
        if (posTop >= wY && oH + posTop <= wY + wH) {
            $(this).addClass('on');
        } else if ((posTop <= wY && posTop + oH > wY) || (posTop >= wY && posTop <= wY + wH)) {
            $(this).addClass('on');
        } else {
            //영역에서 벗어났을때 on클래스 제거
            $(this).removeClass('on');
        }
    });
}


/* ======================================
 * visual Canvas
 * ====================================== */
document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.section_visual');
    if (!section) return;

    const canvas = document.createElement('canvas');
    section.prepend(canvas);

    Object.assign(canvas.style, {
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none'
    });

    const ctx = canvas.getContext('2d');
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
        const r = section.getBoundingClientRect();
        w = r.width;
        h = r.height;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    /* ----- DOTS ----- */
    const DOT_COUNT = Math.floor((w * h) / 12000);
    const dots = [];

    function rand(min, max) {
        return min + Math.random() * (max - min);
    }

    for (let i = 0; i < DOT_COUNT; i++) {
        dots.push({
            x: rand(0, w),
            y: rand(0, h),
            size: rand(0.6, 1.4),
            baseAlpha: rand(0.06, 0.14),
            phase: Math.random() * Math.PI * 2,
            speed: rand(0.006, 0.012)
        });
    }

    /* ----- DRAW ----- */
    const COLOR = '180,200,230';

    function draw() {
        ctx.clearRect(0, 0, w, h);

        dots.forEach(d => {
            d.phase += d.speed * 1.3;

            // 사인파 기반 반짝임 (아주 느리게)
            const twinkle =
                (Math.sin(d.phase) + 1) * 0.5; // 0~1

            const alpha = d.baseAlpha + twinkle * 0.12;

            ctx.fillStyle = `rgba(${COLOR},${alpha})`;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    draw();

    /* ----- VISIBILITY OPTIMIZATION ----- */
    const io = new IntersectionObserver(
        ([e]) => canvas.style.opacity = e.isIntersecting ? '1' : '0',
        { threshold: 0.1 }
    );
    io.observe(section);
});

/* ======================================
 * FAQ Accordion
 * ====================================== */
function faqAccordion() {
	var accoItem = $('.faq_list > ul > li');
    accoItem.addClass('hidden');
    accoItem.find('.faq_body').hide();

    if(accoItem.hasClass('active') === true){
        $('.faq_list > ul > li.active').removeClass('hidden').find('.faq_body').show();
    }

	$('.faq_list > ul > li > .faq_head').click(function(){
		var onAccoItem = $(this).parents('.faq_list > ul > li:first');
		if(onAccoItem.hasClass('hidden') === true){
			accoItem.addClass('hidden').removeClass('active');
			accoItem.find('.faq_body').hide(0);
			onAccoItem.removeClass('hidden').addClass('active');
			onAccoItem.find('.faq_body').show();

            var _thisOffset = onAccoItem.offset();
            $('html').animate({ scrollTop: _thisOffset.top - 115 },400);
		}
        else {
			onAccoItem.removeClass('active').addClass('hidden');
			onAccoItem.find('.faq_body').hide();
		}
		return false;
	});
}
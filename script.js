/**
 * Created by Nikami on 28.08.2016.
 */
var showQuestInfo = function(event) {
    var currentQuest = $(event.currentTarget);
    var currentQuestOrder = currentQuest.attr('data-order');
    var chronicleInfo = $('.chronicle-info');

    currentQuest.parent().find('.active').removeClass('active');
    currentQuest.addClass('active');
    chronicleInfo.find('.chronicle-info-mission.block')
        .removeClass('block')
        .addClass('hidden');
    chronicleInfo.find('.chronicle-info-mission[data-order="' + currentQuestOrder + '"]')
        .removeClass('hidden')
        .addClass('block');
};

var showSortQuestInfo = function (event) {
    var el = $(event.currentTarget);
    var value = el.attr('data-period') || el.attr('data-status');

    $('.chronicle-buttons__button.active').removeClass('active');
    el.addClass('active');

    if (value === 'a' || value === 'c' || value === 'x') {
        showMissions('data-status');
    } else if (value) {
        showMissions('data-period');
    }

    function showMissions(attr) {
        var missions = $('.chronicle-quests__mission');
        var connecting = $('.connecting-span--missions');
        var isFounded = false;

        if (connecting) {
            connecting.fadeOut(200);
        }

        missions.each(function (i, mission) {
            if (value === 'all' || $(mission).attr(attr) === value) {
                $(mission).fadeIn(600);
                isFounded = true;
            } else {
                $(mission).fadeOut(400);
            }
            $('.chronicle-quests__mission.active').removeClass('active');
            $('.chronicle-info').find('.chronicle-info-mission.block')
                .removeClass('block')
                .addClass('hidden');
        });

        if (!isFounded) {
            connecting.fadeIn(600);
        }
    }
};
$('.chronicle-quests__mission').on('click', showQuestInfo);
$('.chronicle-buttons__button').on('click', showSortQuestInfo);
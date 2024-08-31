import React, { useState, useEffect } from 'react';

import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { Link } from 'react-router-dom';

const WeekdayOriginalsAndVideosPage = () => {

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const dataOriginals = [
        { id: 1, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 2, img: "https://wallpapercave.com/wp/wp3788226.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 3, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Mon', genre: "Animals", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 4, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Mon', genre: "Comedy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 5, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Mon', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 6, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Tue', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 7, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Tue', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 8, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 9, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Tue', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 10, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Tue', genre: "School", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 11, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 12, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Wed', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 13, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 14, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 15, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 16, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Thu', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 17, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 18, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 19, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 20, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 21, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 22, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 23, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 24, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 25, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 26, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 27, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 28, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 29, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 30, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 31, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 32, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 33, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 34, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 35, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 36, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 37, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 38, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Animals", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 39, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Comedy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 40, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 41, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 42, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 43, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 44, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Tue', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 45, img: "https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540", dayOfWeek: 'Tue', genre: "School", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 46, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Thu', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 47, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 48, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 49, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 50, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 51, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 52, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 53, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 54, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 55, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 56, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 57, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 58, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 59, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 60, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 61, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 62, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 63, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 64, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 65, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    ]

    const dataVideos = [
        { id: 1, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 2, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 3, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Animals", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 4, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Comedy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 5, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Mon', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 6, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Tue', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 7, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Tue', genre: "Drama", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 8, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 9, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 10, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "School", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 11, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 12, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Wed', genre: "Historical", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 13, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 14, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 15, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 16, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Thu', genre: "Action", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 17, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 18, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 19, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 20, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 21, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 22, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Fri', genre: "Fantasy", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 23, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 24, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 25, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Fri', genre: "Fantasy", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 26, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 27, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 28, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Sat', genre: "Fantasy", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 29, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 30, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 31, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Sun', genre: "Fantasy", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 32, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 33, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 34, img: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/24/gaming-the-witcher-3-wild-hunt-screenshot-2.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*", dayOfWeek: 'Sun', genre: "Fantasy", name: "The Witcher", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 35, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Doraemon", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 36, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 37, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 38, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Animals", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 39, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Comedy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 40, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Mon', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 41, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 42, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 43, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 44, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 45, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Tue', genre: "School", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 46, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Thu', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 47, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 48, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 49, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 50, img: "https://i.pinimg.com/474x/b2/a2/9e/b2a29e2b8afb0f473476ea8a0d5da671.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 51, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 52, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 53, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 54, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 55, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 56, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 57, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 58, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 59, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 60, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 61, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 62, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 63, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 64, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
        { id: 65, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", },
    ];

    //Chọn nội dung theo thứ
    const [currentDay, setCurrentDay] = useState('');

    useEffect(() => {
        const today = new Date();
        const dayString = format(today, 'EEEE', { locale: enUS }); // Lấy ngày trong tuần dựa trên locale
        const spacedDay = dayString.slice(0, 3); // Thêm khoảng trắng sau 3 ký tự đầu tiên
        setCurrentDay(spacedDay);
    }, []);

    const handleSelectDay = (day) => {
        setCurrentDay(day);
    };

    //chọn nội dung truyện theo thứ hiện tại
    const filteredOriginals = dataOriginals.filter(data => data.dayOfWeek === currentDay);

    //chọn nội dung videos theo thứ hiện tại
    const filteredVideos = dataVideos.filter(data => data.dayOfWeek === currentDay);

    // Điều hướng đến trang truyện và videos
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Khi lia chuột hiên icon khi lia vào truyện hoặc video
    const [hoveredOriginalItem, setHoveredOriginalItem] = useState(null);
    const [hoveredVideoItem, setHoveredVideoItem] = useState(null);

    return (
        <div className="w-full min-h-[560px]">
            {/* Phần hiển thị nội dung theo thứ trong tuần */}
            <div className="w-full xs:min-h-[60px] sm:h-[60px] bg-white shadow flex items-center justify-center">
                <ul
                    className="w-[850px] grid xs:grid-cols-4 sm:grid-cols-7"
                >
                    {days.map(day => (
                        <li
                            key={day}
                            onClick={() => handleSelectDay(day)}
                            className={`max-w-[120px] h-[60px] uppercase font-semibold text-md cursor-pointer flex items-center justify-center ${currentDay === day ? 'bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-500 text-white' : 'bg-white text-black hover:text-yellow-500 '}`}
                        >
                            {day}
                        </li>
                    ))}
                </ul>
                <div className="w-[150px] h-full flex items-center justify-center">

                    <button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <span className='w-[100px] h-full border-l-2 pl-10 uppercase font-semibold text-md text-gray-400 hover:text-yellow-500 flex items-center justify-center'>
                            More
                            <NavigateNextIcon />
                        </span>

                    </button>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Link to={`/originals`}>
                            <MenuItem onClick={handleClose}>Originals</MenuItem>
                        </Link>

                        <Link to={`/videos`}>
                            <MenuItem onClick={handleClose}>Videos</MenuItem>
                        </Link>
                    </Menu>

                </div>
            </div>
            <div className="w-full min-h-[500px] py-[30px] flex justify-center">
                <div className="grid grid-cols-1 gap-y-4">

                    {/* khung nội dung dành cho truyện */}
                    <div className="w-full h-full">
                        <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-4">
                            {/* khung nội dung */}
                            {filteredOriginals.slice(0, 5).map((item) => (
                                <Link to={`/originals/original/series`} className="max-w-[210px] h-[210px]" >
                                    <li
                                        key={item.id}
                                        onMouseEnter={() => setHoveredOriginalItem(item.id)}
                                        onMouseLeave={() => setHoveredOriginalItem(null)}
                                        className="max-w-[210px] 2xl:w-[210px] h-[210px] rounded-md bg-white relative cursor-pointer transition-shadow duration-300 hover:shadow"
                                    >

                                        <div className="w-full h-full" >
                                            <img
                                                src={item.img}
                                                alt="img"
                                                className="object-fill w-full h-full rounded-md"
                                            />

                                            {hoveredOriginalItem === item.id && (
                                                <div className="absolute inset-0 border-4 border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                    <AutoStoriesIcon sx={{ fontSize: 40 }} />
                                                </div>

                                                // <div className="absolute inset-0 flex items-center justify-center text-yellow-500 z-10">
                                                //     <img
                                                //         src={item.img}
                                                //         alt="img"
                                                //         class="object-fill w-full h-full rounded-md"
                                                //     />
                                                //     <div className="absolute w-full h-full flex items-center justify-center border-4 border-yellow-500 rounded-md">
                                                //         <AutoStoriesIcon sx={{ fontSize: 40 }} />
                                                //     </div>
                                                // </div>
                                            )}
                                        </div>

                                        <div className="w-full absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                            <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                <span className="text-black text-lg font-semibold text-shadow-white leading-[1.2] line-clamp-2">
                                                    {item.name}
                                                </span>
                                                <span className="text-black text-md text-shadow-white leading-[1.2] line-clamp-1">
                                                    {item.auth}
                                                </span>
                                            </div>

                                            <div className="w-full mb-[25px]">
                                                <span className="w-[75px] text-rose-300 rounded-full text-sm font-semibold flex items-center gap-1">
                                                    <FavoriteIcon />
                                                    {item.like}
                                                </span>
                                                <span className="w-[35px] h-[35px] mt-2 uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                    Up
                                                </span>
                                            </div>

                                            {/*Trong component React của bạn */}
                                            <div className="w-full h-[30px] shadow bg-white bg-opacity-80 rounded-md">
                                                <span className="w-full px-2 py-1 text-black text-sm font-semibold shadow-xl flex items-center justify-center rounded-md">
                                                    {item.genre}
                                                </span>
                                            </div>

                                        </div>

                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>

                    {/* khung nội dung dành cho videos */}
                    <div className="w-full h-full">
                        <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-7 gap-4">
                            {/* khung nội dung */}
                            {filteredVideos.slice(0, 5).map((item) => (
                                <Link to={`/videos/video/series`} className="max-w-[210px] h-[210px]" >
                                    <li
                                        key={item.id}
                                        onMouseEnter={() => setHoveredVideoItem(item.id)}
                                        onMouseLeave={() => setHoveredVideoItem(null)}
                                        className="max-w-[210px] 2xl:w-[210px] h-[210px] rounded-md bg-white relative cursor-pointer transition-shadow duration-300 hover:shadow"
                                    >

                                        <div className="w-full h-full" >
                                            <img
                                                src={item.img}
                                                alt="img"
                                                className="object-fill w-full h-full rounded-md"
                                            />

                                            {hoveredVideoItem === item.id && (
                                                <div className="absolute inset-0 border-4 border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 z-10">
                                                    <PlayArrowIcon sx={{ fontSize: 60 }} />
                                                </div>

                                                // <div class="absolute inset-0  flex items-center justify-center text-yellow-500 z-10">
                                                //     <img
                                                //         src={item.img}
                                                //         alt="img"
                                                //         class="object-fill w-full h-full rounded-md"
                                                //     />
                                                //     <div className="absolute w-full h-full flex items-center justify-center border-4 border-yellow-500 rounded-md">
                                                //         <PlayArrowIcon sx={{ fontSize: 60 }} />
                                                //     </div>
                                                // </div>
                                            )}
                                        </div>

                                        <div className="w-full absolute inset-0 flex flex-wrap items-center px-3 py-3">
                                            <div className="w-full h-[65px] mb-auto overflow-hidden">
                                                <span className="text-black text-lg font-semibold text-shadow-white leading-[1.2] line-clamp-2">
                                                    {item.name}
                                                </span>
                                                <span className="text-black text-md text-shadow-white leading-[1.2] line-clamp-1">
                                                    {item.auth}
                                                </span>
                                            </div>

                                            <div className="w-full mb-[25px]">
                                                <span className="w-[75px] text-rose-300 rounded-full px-1 text-sm font-semibold flex items-center gap-1">
                                                    <FavoriteIcon />
                                                    {item.like}
                                                </span>
                                                <span className="w-[35px] h-[35px] mt-2 uppercase bg-gradient-to-t from-green-300 via-green-400 to-green-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                                    Up
                                                </span>
                                            </div>

                                            {/*Trong component React của bạn */}
                                            <div className="w-full h-[30px] shadow bg-gray-300 bg-opacity-80 rounded-md">
                                                <span className="w-full px-2 py-1 text-white text-sm font-semibold shadow-xl flex items-center justify-center rounded-md">
                                                    {item.genre}
                                                </span>
                                            </div>

                                        </div>

                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeekdayOriginalsAndVideosPage;

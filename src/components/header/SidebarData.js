import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons  from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';
import fire from '../../fire';

export const SidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Trending',
    path: '/trending',
    icon: <IoIcons.IoMdTrendingUp />,
  },
  {
    title: 'Movies',
    path: '/movies',
    icon: <MdIcons.MdMovie />,
  },
  {
    title: 'Tv Shows',
    path: '/tvshows',
    icon: <RiIcons.RiTv2Line />,
  },
  {
    title: 'Search',
    path: '/search/movies',
    icon: <RiIcons.RiSearchLine />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Search Movies',
        path: '/search/movies',
        icon: <RiIcons.RiSearchFill />,
        cName: 'sub-nav'
      },
      {
        title: 'Search Tv Shows',
        path: '/search/tvshows',
        icon: <RiIcons.RiSearchFill />,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'Favourites',
    path: '/favourites',
    icon: <MdIcons.MdFavorite />
  },
  {
    title: 'LogOut',
    path: '/logout',
    icon: <BiIcons.BiLogOut />
  },
  
];
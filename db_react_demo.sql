-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 10, 2022 at 02:04 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_react_demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_company_name`
--

CREATE TABLE `tbl_company_name` (
  `id` bigint(20) NOT NULL,
  `name` varchar(32) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_company_name`
--

INSERT INTO `tbl_company_name` (`id`, `name`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Samsung', 1, '2022-10-06 11:11:17', '2022-10-06 11:11:17'),
(2, 'Sony', 1, '2022-10-06 11:11:17', '2022-10-06 11:11:17'),
(3, 'Red mi', 1, '2022-10-06 11:11:36', '2022-10-06 11:11:36'),
(4, 'Vivo', 1, '2022-10-06 11:11:36', '2022-10-06 11:11:36');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order`
--

CREATE TABLE `tbl_order` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `product_qty` int(3) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_order`
--

INSERT INTO `tbl_order` (`id`, `user_id`, `product_id`, `product_qty`, `is_active`, `created_at`, `updated_at`) VALUES
(2, 7, 3, 2, 1, '2022-10-07 04:20:34', '2022-10-07 04:20:34'),
(8, 6, 4, 3, 1, '2022-10-07 05:50:00', '2022-10-07 05:50:00'),
(17, 22, 7, 1, 1, '2022-10-10 08:25:25', '2022-10-10 08:25:25'),
(19, 21, 8, 1, 1, '2022-10-10 10:47:32', '2022-10-10 10:47:32'),
(21, 21, 2, 1, 1, '2022-10-10 10:47:40', '2022-10-10 10:47:40'),
(23, 26, 8, 1, 1, '2022-10-10 11:15:25', '2022-10-10 11:15:25'),
(24, 26, 6, 1, 1, '2022-10-10 11:15:28', '2022-10-10 11:15:28'),
(25, 26, 5, 1, 1, '2022-10-10 11:15:30', '2022-10-10 11:15:30'),
(26, 27, 8, 1, 1, '2022-10-10 11:59:22', '2022-10-10 11:59:22'),
(27, 27, 6, 1, 1, '2022-10-10 11:59:24', '2022-10-10 11:59:24');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

CREATE TABLE `tbl_product` (
  `id` bigint(20) NOT NULL,
  `company_id` bigint(20) NOT NULL,
  `image` varchar(256) NOT NULL,
  `product_name` varchar(32) NOT NULL,
  `product_specification` text NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `os_version` varchar(32) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_product`
--

INSERT INTO `tbl_product` (`id`, `company_id`, `image`, `product_name`, `product_specification`, `price`, `os_version`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'https://m.media-amazon.com/images/I/91W42b8YW+L._SL1500_.jpg', 'samsung a13', 'Up to 12GB RAM with RAM Plus,\r\nMonster 6000mAh battery,\r\nAuto Data Switching.', '15000.00', 'Android', 1, '2022-10-06 11:26:27', '2022-10-10 06:37:36'),
(2, 2, 'https://m.media-amazon.com/images/I/81AQybT5k6L._SL1500_.jpg', 'sony xperia', 'Up to 8GB RAM with RAM Plus,\r\nMonster 7000mAh battery,\r\nAuto Data Switching.', '20000.00', 'ios', 1, '2022-10-06 11:26:27', '2022-10-10 06:37:36'),
(3, 2, 'https://www.visible.com/shop/assets/images/shop/catalogue/iPhone_12_mini_PUR_1.jpg', 'sony z1', 'Up to 8GB RAM with RAM Plus,\r\nMonster 5000mAh battery,\r\nAuto Data Switching.', '21000.00', 'Android', 1, '2022-10-06 11:26:27', '2022-10-10 06:37:36'),
(4, 1, 'https://m.media-amazon.com/images/I/41O1C449O1L._SL500_.jpg', 'samsung a15', 'Up to 6GB RAM with RAM Plus,\r\nMonster 5500mAh battery,\r\nAuto Data Switching.', '51000.00', 'Android', 1, '2022-10-06 11:26:27', '2022-10-10 06:37:36'),
(5, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSW5O6Uw4TbTynLOthZqLyfPMBfvVpORxANw&usqp=CAU', 'vivo v15 pro', 'Up to 6GB RAM with RAM Plus,\r\nMonster 5500mAh battery,\r\nAuto Data Switching.', '25000.00', 'ios', 1, '2022-10-06 11:26:27', '2022-10-10 06:37:36'),
(6, 3, 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1632992438.56431977.jpg', 'red mi note 11', 'Up to 6GB RAM with RAM Plus,\r\nMonster 5800mAh battery,\r\nAuto Data Switching.', '27000.00', 'Android', 1, '2022-10-06 11:26:27', '2022-10-10 06:37:36'),
(7, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIJaRNy4M8aDMVY-ZB8Ovo0gmwQBX8WoabzYN3FCa_YQX0-lwa7U_8OCZg8LLnLhRga2A&usqp=CAU', 'vivo 17', 'Up to 6GB RAM with RAM Plus,\r\nMonster 5800mAh battery,\r\nAuto Data Switching.', '22000.00', 'Android', 1, '2022-10-06 11:26:27', '2022-10-10 06:37:36'),
(8, 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHQ_gY4XRehXgXp8gGi8eeLGCL9PLL4OHL5Dl-o7Z2okZXdbXkq8B1qGeGRXvvRG0cv2A&usqp=CAU', 'red mi note 10', 'Up to 6GB RAM with RAM Plus,\r\nMonster 5800mAh battery,\r\nAuto Data Switching.', '18000.00', 'Android', 1, '2022-10-06 11:26:27', '2022-10-10 06:37:36');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` bigint(20) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `language` enum('en') DEFAULT NULL,
  `is_online` tinyint(1) DEFAULT 0,
  `last_login` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `name`, `email`, `password`, `language`, `is_online`, `last_login`, `is_deleted`, `is_active`, `created_at`, `updated_at`) VALUES
(27, 'Priyankk', 'priyankpatel4751@gmail.com', '123456', 'en', 1, '2022-10-10 17:32:29', 0, 1, '2022-10-10 11:59:14', '2022-10-10 12:02:29');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_device`
--

CREATE TABLE `tbl_user_device` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `token` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_user_device`
--

INSERT INTO `tbl_user_device` (`id`, `user_id`, `token`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 2, 'rfwvqd9pvi8o1r7xdf1raw8maok8181zdknh5teamsv58z1zzu9h1cbozku9zzvb', 1, '2022-10-06 08:35:40', '2022-10-08 09:48:22'),
(2, 3, 'ky6agat5r2uglqk4k4z5oq2udxmre9yn7eeqrbj2i4qha2knl7lkjq3f8cqqttnx', 1, '2022-10-06 08:37:36', '2022-10-06 08:37:36'),
(3, 4, 'wt1z6azv4mrwj7gwmb2syd7q8bryopvll2pdmkiops7rk9nyyt9lsuw1sgtemz04', 1, '2022-10-06 08:39:35', '2022-10-08 08:26:20'),
(4, 5, '4j4smvbcmtqyn531a8sb03w8sr842lj4hb81pf4sautp0vp6n4p3af6063v588xj', 1, '2022-10-06 08:50:19', '2022-10-06 08:58:07'),
(5, 6, '36h8qbihdk4251swwzakcywn98i2xgar7rg28jw6nmg0a5a9asf7krzlegp73zzv', 1, '2022-10-06 09:07:27', '2022-10-06 09:18:19'),
(6, 7, '0blmd8sphg67qam83elxa7ijig8qoj68eergujsx8az6nnwzk688zhxgtu3n0wbp', 1, '2022-10-06 09:26:45', '2022-10-06 09:26:45'),
(7, 8, 'jvvxw8ktf7drop5jw1w0xsmisp5bn0xl8b24hd0b3ovw9no7ix7jeiy1ncgqotn1', 1, '2022-10-07 13:21:26', '2022-10-07 13:21:26'),
(8, 9, 'iokm1vq0loqxr5unj30vkfa49r6h8twat8g5z9vs6287r0kcedzhs8sx62y8jrih', 1, '2022-10-07 13:45:48', '2022-10-07 13:45:48'),
(9, 10, 'aqrx5h25z9xo9lg21f3ptmk1gnfqmkp980jufkmnrxs3erw51ad6vl50mw7i7wo8', 1, '2022-10-07 14:12:40', '2022-10-07 14:12:40'),
(10, 11, 'p0th5zysr6x0ddoye4jhif9y9u2hkkkg7l3fs6wrb35fzapsc2wqt4uvs2sth2hz', 1, '2022-10-07 14:15:04', '2022-10-07 14:15:04'),
(11, 12, 'm8wwdsb8c5h0fysh8x6ysgasv3156ej24dusj5blp9ss6f9d5jp5bqlsali8890l', 1, '2022-10-08 04:29:37', '2022-10-08 04:29:37'),
(12, 13, '1m7bg2kxc2fv0odp27owf74r25htlniz7wimhxy11x03l7krn95sj65wo8q3qz2o', 1, '2022-10-08 04:32:06', '2022-10-08 04:32:21'),
(13, 14, 'c2zaptdszfotbts6k4rl12rokhn66f0l355f535v1sopn3wnplrd6zhhc8b17jiq', 1, '2022-10-08 04:45:19', '2022-10-08 04:45:19'),
(14, 15, '9lii0opzkuoxold37jzg4ff5bnrt3omwo9s9jmjbl9yql3eibnk9ln7xb1ysi25h', 1, '2022-10-08 04:50:46', '2022-10-08 05:05:47'),
(15, 18, 'vc58ze22p05he1w1wsewtdn64ozjhby03d3obhj1e5wj17n1yqtsrqdsvzsls54o', 1, '2022-10-08 10:36:56', '2022-10-08 13:04:59'),
(16, 19, 'tarllrr8pfc29vtkhh0v4zbfj5w91q3ads09l5ufkipq7cbawamozhxrgtspash8', 1, '2022-10-08 13:28:22', '2022-10-08 13:28:22'),
(17, 20, 'bv8tgb32z46ysp1y0dulcvkclhzsfqvbopjxmobnp32tibxpidn4b32d7bkij42a', 1, '2022-10-08 13:45:43', '2022-10-08 13:45:43'),
(18, 21, '', 1, '2022-10-08 13:53:21', '2022-10-10 10:48:47'),
(19, 22, '1hwq2n309mi3b3d7bk2str3dqnlwdfzadz1te4elxy5ppfrprgidtzg7ndtvob80', 1, '2022-10-08 13:53:54', '2022-10-10 09:53:39'),
(20, 23, 'nu6hn111mwtqo6iw89klp2b7i2rwfkit8tfpxvwg8o8f9f20r0zgvayj4t7xwohc', 1, '2022-10-10 10:41:36', '2022-10-10 10:41:36'),
(21, 24, 'qnxlks49bw5c38958n58284pbhvzbx0l7e6s66twqj0337m53j8ccqg0d2gp8on4', 1, '2022-10-10 10:51:39', '2022-10-10 10:51:39'),
(22, 25, '', 1, '2022-10-10 10:54:02', '2022-10-10 11:09:19'),
(23, 26, 'odpvoi1ubxfw4yjddzqt5zh7nrhc6w178nuudvc86gpe4v579bpvunou075v9v7v', 1, '2022-10-10 11:11:23', '2022-10-10 11:33:20'),
(24, 27, 'qaj7qkcjuci7vh14uuo6faflgcfk56dtt0uzewbjfq4rzfyvslouwo24eaebq8bs', 1, '2022-10-10 11:59:14', '2022-10-10 12:02:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_company_name`
--
ALTER TABLE `tbl_company_name`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_product`
--
ALTER TABLE `tbl_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tbl_user_device`
--
ALTER TABLE `tbl_user_device`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_company_name`
--
ALTER TABLE `tbl_company_name`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_order`
--
ALTER TABLE `tbl_order`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `tbl_product`
--
ALTER TABLE `tbl_product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `tbl_user_device`
--
ALTER TABLE `tbl_user_device`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

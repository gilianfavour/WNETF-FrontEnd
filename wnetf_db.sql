-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2026 at 09:17 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wnetf_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications_application`
--

CREATE TABLE `applications_application` (
  `id` bigint(20) NOT NULL,
  `full_name` varchar(200) NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `course` varchar(300) NOT NULL,
  `university` varchar(300) NOT NULL,
  `university_reg_number` varchar(100) NOT NULL,
  `university_email` varchar(254) NOT NULL,
  `student_number` varchar(100) NOT NULL,
  `grades` longtext NOT NULL,
  `district` varchar(100) NOT NULL,
  `other_district` varchar(100) NOT NULL,
  `guardian_name` varchar(200) NOT NULL,
  `address` varchar(300) NOT NULL,
  `personal_statement` longtext NOT NULL,
  `attachment` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add beneficiary', 7, 'add_beneficiary'),
(26, 'Can change beneficiary', 7, 'change_beneficiary'),
(27, 'Can delete beneficiary', 7, 'delete_beneficiary'),
(28, 'Can view beneficiary', 7, 'view_beneficiary'),
(29, 'Can add application', 8, 'add_application'),
(30, 'Can change application', 8, 'change_application'),
(31, 'Can delete application', 8, 'delete_application'),
(32, 'Can view application', 8, 'view_application'),
(33, 'Can add contact message', 9, 'add_contactmessage'),
(34, 'Can change contact message', 9, 'change_contactmessage'),
(35, 'Can delete contact message', 9, 'delete_contactmessage'),
(36, 'Can view contact message', 9, 'view_contactmessage'),
(37, 'Can add donation', 10, 'add_donation'),
(38, 'Can change donation', 10, 'change_donation'),
(39, 'Can delete donation', 10, 'delete_donation'),
(40, 'Can view donation', 10, 'view_donation'),
(41, 'Can add volunteer', 11, 'add_volunteer'),
(42, 'Can change volunteer', 11, 'change_volunteer'),
(43, 'Can delete volunteer', 11, 'delete_volunteer'),
(44, 'Can view volunteer', 11, 'view_volunteer'),
(45, 'Can add subscriber', 12, 'add_subscriber'),
(46, 'Can change subscriber', 12, 'change_subscriber'),
(47, 'Can delete subscriber', 12, 'delete_subscriber'),
(48, 'Can view subscriber', 12, 'view_subscriber'),
(49, 'Can add impact stat', 13, 'add_impactstat'),
(50, 'Can change impact stat', 13, 'change_impactstat'),
(51, 'Can delete impact stat', 13, 'delete_impactstat'),
(52, 'Can view impact stat', 13, 'view_impactstat'),
(53, 'Can add impact story', 14, 'add_impactstory'),
(54, 'Can change impact story', 14, 'change_impactstory'),
(55, 'Can delete impact story', 14, 'delete_impactstory'),
(56, 'Can view impact story', 14, 'view_impactstory'),
(57, 'Can add event', 15, 'add_event'),
(58, 'Can change event', 15, 'change_event'),
(59, 'Can delete event', 15, 'delete_event'),
(60, 'Can view event', 15, 'view_event'),
(61, 'Can add blog post', 16, 'add_blogpost'),
(62, 'Can change blog post', 16, 'change_blogpost'),
(63, 'Can delete blog post', 16, 'delete_blogpost'),
(64, 'Can view blog post', 16, 'view_blogpost');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beneficiaries_beneficiary`
--

CREATE TABLE `beneficiaries_beneficiary` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `course` varchar(300) NOT NULL,
  `university` varchar(300) NOT NULL,
  `year` varchar(50) NOT NULL,
  `district` varchar(100) NOT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `bio` longtext NOT NULL,
  `is_graduate` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `beneficiaries_beneficiary`
--

INSERT INTO `beneficiaries_beneficiary` (`id`, `name`, `course`, `university`, `year`, `district`, `photo`, `bio`, `is_graduate`, `is_active`, `created_at`) VALUES
(1, 'Amelia Anguyo', 'Bachelor of Medicine and Surgery', 'Makerere University', '3rd Year', 'Arua', '', '', 0, 1, '2026-03-06 18:09:38.088666'),
(2, 'David Olia', 'Bachelor of Engineering (Civil)', 'Kyambogo University', '2nd Year', 'Nebbi', '', '', 0, 1, '2026-03-06 18:09:38.095875'),
(3, 'Grace Draru', 'Bachelor of Pharmacy', 'Mbarara University', '4th Year', 'Zombo', '', '', 0, 1, '2026-03-06 18:09:38.110157'),
(4, 'Moses Andama', 'Bachelor of Nursing Science', 'Makerere University', 'Graduate', 'Moyo', '', '', 1, 1, '2026-03-06 18:09:38.118613'),
(5, 'Patience Aciro', 'Bachelor of Medicine and Surgery', 'Gulu University', '1st Year', 'Adjumani', '', '', 0, 1, '2026-03-06 18:09:38.126513'),
(6, 'Samuel Iga', 'Bachelor of Engineering (Electrical)', 'Makerere University', 'Graduate', 'Maracha', '', '', 1, 1, '2026-03-06 18:09:38.133083');

-- --------------------------------------------------------

--
-- Table structure for table `blog_blogpost`
--

CREATE TABLE `blog_blogpost` (
  `id` bigint(20) NOT NULL,
  `title` varchar(300) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `excerpt` varchar(500) NOT NULL,
  `content` longtext NOT NULL,
  `author` varchar(200) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `category` varchar(100) NOT NULL,
  `is_published` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_blogpost`
--

INSERT INTO `blog_blogpost` (`id`, `title`, `slug`, `excerpt`, `content`, `author`, `image`, `category`, `is_published`, `created_at`, `updated_at`) VALUES
(1, 'WNETF Awards 6 New Scholarships for 2024', 'wnetf-scholarships-2024', 'The West Nile Education Trust Fund is proud to announce six new scholarship recipients for the 2024 academic year.', 'The West Nile Education Trust Fund is proud to announce six new scholarship recipients for the 2024 academic year. These exceptional students from Arua, Nebbi, Moyo, Zombo, Adjumani and Maracha will pursue Medicine, Engineering, Nursing and Pharmacy at accredited Ugandan universities.\n\nThe selection was based on academic merit, financial need, and community service. We thank all our donors whose generosity makes this possible.', 'WNETF Secretariat', '', 'News', 1, '2026-03-06 18:19:23.951772', '2026-03-06 18:19:23.951806'),
(2, 'West Nile Night Raises 8 Million Shillings', 'west-nile-night-fundraiser-results', 'Last month\'s West Nile Night fundraising dinner exceeded expectations, raising UGX 8,000,000 towards student scholarships.', 'Last month\'s West Nile Night fundraising dinner exceeded expectations, raising UGX 8,000,000 towards student scholarships. Over 120 members of the West Nile diaspora and community attended the event held in Kampala.\n\nThe funds raised will directly contribute to tuition fees for current WNETF scholars in their upcoming semester.', 'Events Team', '', 'Fundraising', 1, '2026-03-06 18:19:23.960341', '2026-03-06 18:19:23.960382'),
(3, 'Graduate Story: Moses Andama, Bachelor of Nursing Science', 'graduate-story-moses-andama', 'Moses Andama from Moyo District completed his Bachelor of Nursing Science and is now a registered nurse serving communities in Northern Uganda.', 'Moses Andama from Moyo District completed his Bachelor of Nursing Science at Makerere University with WNETF support. He is now a registered nurse serving at a government hospital in Northern Uganda, specialising in paediatric care.\n\n\"I never imagined I would be where I am today without WNETF. Growing up in Moyo, university felt like a dream for other people — not for someone like me. WNETF changed that completely.\"\n\nMoses is currently enrolled in a part-time post-graduate diploma in Public Health and volunteers every Saturday at a rural health outpost near his home village. He is also an active WNETF mentor, meeting monthly with two current scholars who are pursuing nursing.\n\n\"I am committed to giving back to my community and making sure the next generation does not face the same barriers I did.\"', 'WNETF Team', '', 'Stories', 1, '2026-03-06 18:19:23.967989', '2026-03-06 18:30:06.058818'),
(4, 'WNETF Awards 6 New Scholarships for 2025', 'wnetf-scholarships-2025', 'The West Nile Education Trust Fund is proud to announce six new scholarship recipients for the 2025 academic year, representing five districts across the region.', 'The West Nile Education Trust Fund is proud to announce six new scholarship recipients for the 2025 academic year. These exceptional students from Arua, Nebbi, Moyo, Zombo, Adjumani and Maracha will pursue Medicine, Engineering, Nursing, Pharmacy, Law and Computer Science at accredited Ugandan universities.\n\nThe selection committee reviewed over 80 applications this year — the highest number since WNETF was founded. Selection criteria included academic merit (minimum 15 points at A-Level), demonstrated financial need, community involvement, and a written personal statement.\n\n\"The standard of applicants this year was extraordinary,\" said the WNETF Chair. \"Every single applicant deserves support. We are working hard to grow our donor base so we can reach more deserving students.\"\n\nWe thank all our donors whose generosity makes this possible. To sponsor a student, visit our Donate page.', 'WNETF Secretariat', '', 'News', 1, '2026-03-06 18:30:06.041068', '2026-03-06 18:30:06.041090'),
(5, 'West Nile Night Raises UGX 8 Million', 'west-nile-night-fundraiser-results-2024', 'Last month\'s West Nile Night fundraising dinner exceeded all expectations, raising UGX 8,000,000 towards student scholarships in a single evening.', 'Last month\'s West Nile Night fundraising dinner exceeded all expectations, raising UGX 8,000,000 towards student scholarships. Over 120 members of the West Nile diaspora and community attended the event held at Nexus Lounge in Kampala.\n\nHighlights of the evening included a cultural performance by West Nile artists, a heartfelt live testimonial from two WNETF graduates — Moses Andama (Nursing) and Samuel Iga (Electrical Engineering) — and a live auction that alone raised UGX 2,400,000.\n\nThe funds raised will directly contribute to tuition fees for current WNETF scholars in their upcoming semester. The committee thanks all attendees, performers, and sponsors who made the evening possible.\n\nThe next West Nile Night is scheduled for the last Friday of next month. All are welcome.', 'Events Team', '', 'Fundraising', 1, '2026-03-06 18:30:06.051241', '2026-03-06 18:30:06.051265'),
(6, 'How to Apply for a WNETF Scholarship', 'how-to-apply-wnetf-scholarship', 'A step-by-step guide to applying for a WNETF scholarship, including eligibility criteria, required documents, and key deadlines.', 'Applications for WNETF scholarships open each year in January and close at the end of February. Here is what you need to know.\n\nEligibility:\n- Must be a student from the West Nile region of Uganda (Arua, Nebbi, Moyo, Zombo, Adjumani, Maracha, Madi-Okollo, Koboko, or Terego districts)\n- Must be currently enrolled (or admitted) to an accredited Ugandan university\n- Must demonstrate financial need\n- Must have achieved a minimum of 15 points at A-Level (or equivalent)\n\nRequired Documents:\n- National ID or Birth Certificate\n- A-Level and O-Level certificates\n- University admission letter or student ID\n- Bank statement or financial affidavit from parent/guardian\n- Two reference letters (one academic, one community)\n- A 250-word personal statement\n\nHow to Apply:\nVisit the Applications page on this website and complete the online form. Upload all required documents as a single PDF.\n\nDeadline: 28 February each year.\n\nSuccessful applicants are notified by 31 March and receive their first disbursement before the start of the academic year.', 'WNETF Secretariat', '', 'Scholarships', 1, '2026-03-06 18:30:06.068768', '2026-03-06 18:30:06.068800'),
(7, 'WNETF Partners with Local Schools for Mentorship Programme', 'wnetf-school-mentorship-programme', 'WNETF graduates are now visiting secondary schools in West Nile to mentor O-Level and A-Level students, inspiring the next generation of scholars.', 'WNETF has launched a new school mentorship programme in partnership with six secondary schools across Arua and Nebbi districts. Each month, WNETF graduates visit the schools to speak with S.4 and S.6 students about university pathways, scholarship opportunities, and career prospects.\n\n\"Many students do not apply for WNETF scholarships simply because they do not know we exist,\" said the programme coordinator. \"This mentorship programme puts our graduates directly in front of the students who need them most.\"\n\nThe programme is currently active at Mvara Secondary School, St. Joseph College Ombaci, Arua Progressive Secondary School, Sacred Heart Girls Arua, Ediofe Girls Secondary School, and St. Daniel Comboni College.\n\nIf your school would like to participate in the programme, please contact us via the Contact page.', 'Programmes Team', '', 'Programmes', 1, '2026-03-06 18:30:06.074883', '2026-03-06 18:30:06.074907');

-- --------------------------------------------------------

--
-- Table structure for table `contact_contactmessage`
--

CREATE TABLE `contact_contactmessage` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `subject` varchar(300) NOT NULL,
  `message` longtext NOT NULL,
  `is_read` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(8, 'applications', 'application'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(7, 'beneficiaries', 'beneficiary'),
(16, 'blog', 'blogpost'),
(9, 'contact', 'contactmessage'),
(5, 'contenttypes', 'contenttype'),
(10, 'donate', 'donation'),
(15, 'events', 'event'),
(13, 'impact', 'impactstat'),
(14, 'impact', 'impactstory'),
(6, 'sessions', 'session'),
(12, 'subscribe', 'subscriber'),
(11, 'volunteer', 'volunteer');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2026-03-06 18:08:53.869576'),
(2, 'auth', '0001_initial', '2026-03-06 18:08:55.217638'),
(3, 'admin', '0001_initial', '2026-03-06 18:08:55.547085'),
(4, 'admin', '0002_logentry_remove_auto_add', '2026-03-06 18:08:55.560875'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2026-03-06 18:08:55.574791'),
(6, 'applications', '0001_initial', '2026-03-06 18:08:55.607600'),
(7, 'contenttypes', '0002_remove_content_type_name', '2026-03-06 18:08:55.717150'),
(8, 'auth', '0002_alter_permission_name_max_length', '2026-03-06 18:08:55.852876'),
(9, 'auth', '0003_alter_user_email_max_length', '2026-03-06 18:08:55.881235'),
(10, 'auth', '0004_alter_user_username_opts', '2026-03-06 18:08:55.897356'),
(11, 'auth', '0005_alter_user_last_login_null', '2026-03-06 18:08:55.987998'),
(12, 'auth', '0006_require_contenttypes_0002', '2026-03-06 18:08:55.993634'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2026-03-06 18:08:56.006145'),
(14, 'auth', '0008_alter_user_username_max_length', '2026-03-06 18:08:56.030429'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2026-03-06 18:08:56.069606'),
(16, 'auth', '0010_alter_group_name_max_length', '2026-03-06 18:08:56.097454'),
(17, 'auth', '0011_update_proxy_permissions', '2026-03-06 18:08:56.109992'),
(18, 'auth', '0012_alter_user_first_name_max_length', '2026-03-06 18:08:56.134856'),
(19, 'beneficiaries', '0001_initial', '2026-03-06 18:08:56.167048'),
(20, 'contact', '0001_initial', '2026-03-06 18:08:56.208759'),
(21, 'donate', '0001_initial', '2026-03-06 18:08:56.242532'),
(22, 'sessions', '0001_initial', '2026-03-06 18:08:56.307438'),
(23, 'subscribe', '0001_initial', '2026-03-06 18:08:56.364969'),
(24, 'volunteer', '0001_initial', '2026-03-06 18:08:56.504378'),
(25, 'blog', '0001_initial', '2026-03-06 18:18:54.669031'),
(26, 'events', '0001_initial', '2026-03-06 18:18:54.728923'),
(27, 'impact', '0001_initial', '2026-03-06 18:18:54.830859');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donate_donation`
--

CREATE TABLE `donate_donation` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `frequency` varchar(20) NOT NULL,
  `message` longtext NOT NULL,
  `is_anonymous` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events_event`
--

CREATE TABLE `events_event` (
  `id` bigint(20) NOT NULL,
  `title` varchar(300) NOT NULL,
  `description` longtext NOT NULL,
  `date` datetime(6) NOT NULL,
  `location` varchar(300) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `is_upcoming` tinyint(1) NOT NULL,
  `registration_link` varchar(200) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events_event`
--

INSERT INTO `events_event` (`id`, `title`, `description`, `date`, `location`, `image`, `is_upcoming`, `registration_link`, `created_at`) VALUES
(1, 'West Nile Night � Monthly Fundraiser', 'Join us every last Friday of the month for the West Nile Night fundraising dinner. An evening of community, culture, and giving.', '2026-03-20 18:19:23.914901', 'Kampala, Uganda', '', 1, '', '2026-03-06 18:19:23.919153'),
(2, 'WNETF Annual Dinner 2024', 'Our flagship annual fundraising dinner bringing together donors, scholars, graduates and community leaders to celebrate impact and raise funds for the next cohort.', '2026-06-04 18:19:23.914914', 'Kampala Serena Hotel', '', 1, '', '2026-03-06 18:19:23.926212'),
(3, 'Scholar Orientation Day 2024', 'Annual orientation for newly admitted WNETF scholars. Meet your mentors, fellow scholars, and the WNETF board.', '2026-02-04 18:19:23.914917', 'Arua, West Nile', '', 0, '', '2026-03-06 18:19:23.942830'),
(4, 'West Nile Night — Monthly Fundraiser Dinner', 'Join us every last Friday of the month for the West Nile Night fundraising dinner. An evening of West Nile culture, music, food, and community generosity. All proceeds go directly to student scholarships. Tables available for groups and individuals.', '2026-03-20 18:30:05.988768', 'Nexus Lounge, Kampala', '', 1, 'mailto:inquirieswnetf@gmail.com', '2026-03-06 18:30:05.996323'),
(5, 'WNETF Annual Gala Dinner 2025', 'Our flagship annual fundraising gala brings together donors, scholars, graduates, board members and community leaders to celebrate impact and raise funds for the incoming cohort of scholars. Black-tie event with live entertainment, keynote speakers and a silent auction.', '2026-06-04 18:30:05.988768', 'Kampala Serena Hotel, Kampala', '', 1, 'mailto:inquirieswnetf@gmail.com', '2026-03-06 18:30:06.007067'),
(6, 'Scholar Meet & Greet — New Cohort 2025', 'Newly selected WNETF scholars for 2025 will meet their mentors, board representatives and fellow scholars for the first time. An orientation on academic expectations, code of conduct and support systems available through WNETF.', '2026-04-10 18:30:05.988768', 'Arua City, West Nile', '', 1, '', '2026-03-06 18:30:06.019928'),
(7, 'WNETF Fun Run — Arua 2024', 'Our inaugural community fun run held in Arua City raised over UGX 12,000,000 for the scholarship fund. Hundreds of participants from the West Nile community, diaspora visitors, and scholars turned out to run, walk, and celebrate education.', '2025-12-16 18:30:05.988768', 'Arua City Stadium, West Nile', '', 0, '', '2026-03-06 18:30:06.026460'),
(8, 'West Nile Night — Annual Fundraiser 2024', 'The 2024 edition of the West Nile Night raised UGX 8,000,000 in a single evening. Over 120 members of the West Nile diaspora and community attended the event at Nexus Lounge Kampala. Highlights included a cultural performance and a live testimonial from two WNETF graduates.', '2026-01-20 18:30:05.988768', 'Nexus Lounge, Kampala', '', 0, '', '2026-03-06 18:30:06.033321');

-- --------------------------------------------------------

--
-- Table structure for table `impact_impactstat`
--

CREATE TABLE `impact_impactstat` (
  `id` bigint(20) NOT NULL,
  `stat_value` varchar(50) NOT NULL,
  `stat_label` varchar(200) NOT NULL,
  `description` longtext NOT NULL,
  `icon` varchar(100) NOT NULL,
  `order` int(10) UNSIGNED NOT NULL CHECK (`order` >= 0),
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `impact_impactstat`
--

INSERT INTO `impact_impactstat` (`id`, `stat_value`, `stat_label`, `description`, `icon`, `order`, `is_active`, `created_at`) VALUES
(1, '26+', 'Students Sponsored', 'Bright students from West Nile supported through university education.', '', 1, 1, '2026-03-06 18:19:23.857705'),
(2, '9', 'Graduates', 'Students who have completed their professional degrees with WNETF support.', '', 2, 1, '2026-03-06 18:19:23.864673'),
(3, '6', 'Universities', 'Partner universities across Uganda hosting WNETF scholars.', '', 3, 1, '2026-03-06 18:19:23.883806'),
(4, '9', 'Districts Reached', 'Districts across the West Nile region represented in our scholarship programme.', '', 4, 1, '2026-03-06 18:19:23.891835'),
(5, 'UGX 180M+', 'Invested in Education', 'Total tuition and living support disbursed to WNETF scholars since inception.', '', 5, 1, '2026-03-06 18:30:05.943064'),
(6, '100%', 'Graduate Employment', 'All WNETF graduates are currently employed or in post-graduate study.', '', 6, 1, '2026-03-06 18:30:05.954189');

-- --------------------------------------------------------

--
-- Table structure for table `impact_impactstory`
--

CREATE TABLE `impact_impactstory` (
  `id` bigint(20) NOT NULL,
  `title` varchar(300) NOT NULL,
  `content` longtext NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `beneficiary_name` varchar(200) NOT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `impact_impactstory`
--

INSERT INTO `impact_impactstory` (`id`, `title`, `content`, `image`, `beneficiary_name`, `is_featured`, `created_at`) VALUES
(1, 'From Arua to Makerere: Amelia\'s Journey', 'Amelia Anguyo grew up in a humble family in Arua. With WNETF support she is now in her 3rd year of Medicine at Makerere University, determined to return and serve her community.', '', 'Amelia Anguyo', 1, '2026-03-06 18:19:23.899799'),
(2, 'Engineering the Future: Samuel\'s Story', 'Samuel Iga from Maracha completed his Bachelor of Electrical Engineering at Makerere University. He now works with a leading infrastructure firm and mentors younger WNETF scholars.', '', 'Samuel Iga', 1, '2026-03-06 18:19:23.910006'),
(3, 'Healing Communities: Grace in Nursing', 'Grace Adiru from Nebbi District dreamed of becoming a nurse since childhood, inspired by the nurses who cared for her mother during a prolonged illness. Financial constraints made university seem impossible until WNETF stepped in. Grace completed her Bachelor of Nursing Science at Clarke International University and is now a registered nurse at a government hospital in Nebbi. She runs a voluntary health education programme in her village every Saturday morning.', '', 'Grace Adiru', 0, '2026-03-06 18:30:05.975134'),
(4, 'Law and Justice: Patrick Speaks for West Nile', 'Patrick Drani from Zombo District is in his final year of the Bachelor of Laws at Uganda Christian University. He intends to practise human rights law and return to West Nile to provide affordable legal services to rural communities. WNETF covered four years of his tuition when his family could not. \'Access to justice should not be a privilege. I will dedicate my career to making sure it is not,\' Patrick says.', '', 'Patrick Drani', 0, '2026-03-06 18:30:05.980509');

-- --------------------------------------------------------

--
-- Table structure for table `subscribe_subscriber`
--

CREATE TABLE `subscribe_subscriber` (
  `id` bigint(20) NOT NULL,
  `email` varchar(254) NOT NULL,
  `name` varchar(200) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `volunteer_volunteer`
--

CREATE TABLE `volunteer_volunteer` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `occupation` varchar(200) NOT NULL,
  `skills` longtext NOT NULL,
  `motivation` longtext NOT NULL,
  `availability` varchar(200) NOT NULL,
  `is_diaspora` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications_application`
--
ALTER TABLE `applications_application`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `beneficiaries_beneficiary`
--
ALTER TABLE `beneficiaries_beneficiary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_blogpost`
--
ALTER TABLE `blog_blogpost`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `contact_contactmessage`
--
ALTER TABLE `contact_contactmessage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `donate_donation`
--
ALTER TABLE `donate_donation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events_event`
--
ALTER TABLE `events_event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `impact_impactstat`
--
ALTER TABLE `impact_impactstat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `impact_impactstory`
--
ALTER TABLE `impact_impactstory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribe_subscriber`
--
ALTER TABLE `subscribe_subscriber`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `volunteer_volunteer`
--
ALTER TABLE `volunteer_volunteer`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications_application`
--
ALTER TABLE `applications_application`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beneficiaries_beneficiary`
--
ALTER TABLE `beneficiaries_beneficiary`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blog_blogpost`
--
ALTER TABLE `blog_blogpost`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contact_contactmessage`
--
ALTER TABLE `contact_contactmessage`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `donate_donation`
--
ALTER TABLE `donate_donation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events_event`
--
ALTER TABLE `events_event`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `impact_impactstat`
--
ALTER TABLE `impact_impactstat`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `impact_impactstory`
--
ALTER TABLE `impact_impactstory`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subscribe_subscriber`
--
ALTER TABLE `subscribe_subscriber`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `volunteer_volunteer`
--
ALTER TABLE `volunteer_volunteer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

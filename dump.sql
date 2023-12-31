--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: agents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agents (
    name character varying NOT NULL,
    password character varying NOT NULL,
    "phoneNumber" character varying NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.agents OWNER TO postgres;

--
-- Name: agents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agents_id_seq OWNER TO postgres;

--
-- Name: agents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agents_id_seq OWNED BY public.agents.id;


--
-- Name: cars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cars (
    id integer NOT NULL,
    name character varying NOT NULL,
    model character varying NOT NULL,
    "numberOfPeople" integer NOT NULL,
    make character varying NOT NULL,
    plate character varying NOT NULL,
    year character varying NOT NULL
);


ALTER TABLE public.cars OWNER TO postgres;

--
-- Name: cars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cars_id_seq OWNER TO postgres;

--
-- Name: cars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cars_id_seq OWNED BY public.cars.id;


--
-- Name: colors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colors (
    id integer NOT NULL,
    name character varying NOT NULL,
    "colorCode" character varying NOT NULL
);


ALTER TABLE public.colors OWNER TO postgres;

--
-- Name: colors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.colors_id_seq OWNER TO postgres;

--
-- Name: colors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colors_id_seq OWNED BY public.colors.id;


--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    gender character varying NOT NULL,
    nationality character varying NOT NULL,
    address character varying NOT NULL,
    "phoneNumber" character varying NOT NULL,
    "identificationNumber" character varying NOT NULL,
    "carId" integer
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employees_id_seq OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- Name: prices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prices (
    id integer NOT NULL,
    price integer NOT NULL,
    "fromId" integer,
    "toId" integer,
    "carId" integer,
    "agentId" integer
);


ALTER TABLE public.prices OWNER TO postgres;

--
-- Name: prices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prices_id_seq OWNER TO postgres;

--
-- Name: prices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prices_id_seq OWNED BY public.prices.id;


--
-- Name: reservations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservations (
    id integer NOT NULL,
    "reservationDate" timestamp with time zone NOT NULL,
    price integer,
    status character varying DEFAULT 'Beklemede'::character varying NOT NULL,
    "passengerName" character varying,
    "passengerPhone" character varying,
    "createdDate" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedDate" timestamp with time zone DEFAULT now() NOT NULL,
    "fromId" integer,
    "toId" integer,
    "carId" integer,
    "userId" uuid,
    "agentId" integer,
    "passengerAdultsCount" integer DEFAULT 0 NOT NULL,
    "passengerChildsCount" integer DEFAULT 0 NOT NULL,
    "passengerGender" character varying,
    "passengerBabyChair" integer,
    amplifier integer,
    "passengerPay" integer DEFAULT 0 NOT NULL,
    "driverNote" character varying,
    "operationNote" character varying,
    "flightNo" character varying,
    "passengerEmail" character varying,
    currency character varying,
    "passengerPayCurrency" character varying
);


ALTER TABLE public.reservations OWNER TO postgres;

--
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservations_id_seq OWNER TO postgres;

--
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- Name: sections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sections (
    id integer NOT NULL,
    "sectionName" character varying NOT NULL,
    city character varying NOT NULL,
    district character varying NOT NULL,
    street character varying NOT NULL,
    description character varying NOT NULL
);


ALTER TABLE public.sections OWNER TO postgres;

--
-- Name: sections_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sections_id_seq OWNER TO postgres;

--
-- Name: sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sections_id_seq OWNED BY public.sections.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    role character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: agents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agents ALTER COLUMN id SET DEFAULT nextval('public.agents_id_seq'::regclass);


--
-- Name: cars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars ALTER COLUMN id SET DEFAULT nextval('public.cars_id_seq'::regclass);


--
-- Name: colors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors ALTER COLUMN id SET DEFAULT nextval('public.colors_id_seq'::regclass);


--
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- Name: prices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prices ALTER COLUMN id SET DEFAULT nextval('public.prices_id_seq'::regclass);


--
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- Name: sections id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sections ALTER COLUMN id SET DEFAULT nextval('public.sections_id_seq'::regclass);


--
-- Data for Name: agents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agents (name, password, "phoneNumber", id) FROM stdin;
Tugay	123456	13123123	10
Tugay2	12345678	0234234	43
Ata	123456	23402342	46
\.


--
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cars (id, name, model, "numberOfPeople", make, plate, year) FROM stdin;
4	Vito 10x	Ducato	10	Fiat	43 ART 322	2020
1	Vito 6x	Transporter	6	Mercedes	42 ATK 42	2021
6	citroen jumpy	sadfsa	10	sdfsdef	45 atk 45	2020
\.


--
-- Data for Name: colors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.colors (id, name, "colorCode") FROM stdin;
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, "firstName", "lastName", gender, nationality, address, "phoneNumber", "identificationNumber", "carId") FROM stdin;
4	Tugay 3	├çelmeli	Erkek	TC	sadad	2423	123123	6
5	Tugay 4	├çelmeli	Erkek	TC	K─░razl─▒ asdasdsa	04235422322222	12335345	6
6	Tugay	├çelmeli	Erkek	TC	ASDasdas	123123	1241231	\N
\.


--
-- Data for Name: prices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.prices (id, price, "fromId", "toId", "carId", "agentId") FROM stdin;
4	1000	3	2	1	10
6	1500	3	2	1	43
7	1900	2	3	4	46
5	20000	1	2	4	46
\.


--
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservations (id, "reservationDate", price, status, "passengerName", "passengerPhone", "createdDate", "updatedDate", "fromId", "toId", "carId", "userId", "agentId", "passengerAdultsCount", "passengerChildsCount", "passengerGender", "passengerBabyChair", amplifier, "passengerPay", "driverNote", "operationNote", "flightNo", "passengerEmail", currency, "passengerPayCurrency") FROM stdin;
2	2023-06-27 18:00:00+00	1000	Onayland─▒	Tugay	023432423	2023-06-27 16:49:44.923126+00	2023-07-01 10:18:05.358221+00	2	1	1	95f8a36e-a8db-4090-879c-8517a3e37f19	\N	0	0	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
3	2023-06-27 18:00:00+00	1000	Onayland─▒	asd	034543	2023-06-27 16:59:26.879868+00	2023-07-01 10:23:09.857805+00	2	1	1	95f8a36e-a8db-4090-879c-8517a3e37f19	\N	0	0	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
5	2023-07-01 13:30:00+00	2000	Beklemede			2023-07-01 10:27:28.065536+00	2023-07-01 10:27:28.065536+00	2	1	1	95f8a36e-a8db-4090-879c-8517a3e37f19	\N	0	0	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
8	2023-07-01 14:30:00+00	2000	Beklemede			2023-07-01 10:28:06.825698+00	2023-07-01 10:28:06.825698+00	2	1	1	95f8a36e-a8db-4090-879c-8517a3e37f19	\N	0	0	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
9	2023-07-02 09:00:00+00	500	Beklemede	Test	0324234	2023-07-01 10:32:22.196028+00	2023-07-01 10:32:22.196028+00	2	1	1	95f8a36e-a8db-4090-879c-8517a3e37f19	\N	0	0	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
4	2023-07-01 12:30:00+00	1500	Onayland─▒	Tugay	05310816745	2023-07-01 10:25:44.689291+00	2023-07-06 19:38:03.7164+00	2	1	1	95f8a36e-a8db-4090-879c-8517a3e37f19	\N	0	0	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
10	2023-07-07 12:30:00+00	3000	Beklemede	Mehmet	023423423	2023-07-06 19:39:58.357091+00	2023-07-06 19:39:58.357091+00	2	1	1	95f8a36e-a8db-4090-879c-8517a3e37f19	\N	0	0	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
11	2023-07-08 12:30:00+00	1500	Beklemede	wer	03423	2023-07-08 11:55:24.066457+00	2023-07-08 11:55:24.066457+00	2	1	1	c31e1893-0790-413e-ac23-66fca8262f30	\N	0	0	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
12	2023-07-08 12:30:00+00	1000	Beklemede	asda	3453242	2023-07-08 11:59:07.543202+00	2023-07-08 11:59:07.543202+00	2	1	1	c31e1893-0790-413e-ac23-66fca8262f30	10	0	0	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
13	2023-07-08 11:30:00+00	1000	Beklemede	asdas	324234	2023-07-08 12:32:02.38025+00	2023-07-08 12:32:02.38025+00	2	1	1	1b3c3058-b8ad-46b0-b729-88a4831702ce	10	0	0	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
14	2023-07-08 12:40:00+00	1000	Onayland─▒	asd	234	2023-07-08 12:43:18.60291+00	2023-07-08 12:43:54.876427+00	2	1	1	1b3c3058-b8ad-46b0-b729-88a4831702ce	10	0	0	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
18	2023-07-08 12:30:00+00	1500	Onayland─▒	asda1	123	2023-07-08 13:44:56.346074+00	2023-07-15 09:38:08.590289+00	2	1	1	1b3c3058-b8ad-46b0-b729-88a4831702ce	46	0	0	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
19	2023-07-29 21:00:00+00	1900	Beklemede	asdasd	345345	2023-07-30 14:32:05.150718+00	2023-07-30 14:32:05.150718+00	2	3	4	c31e1893-0790-413e-ac23-66fca8262f30	\N	0	0	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
23	2023-07-30 21:00:00+00	1900	Beklemede			2023-07-30 17:05:44.300811+00	2023-07-30 17:05:44.300811+00	2	3	4	c31e1893-0790-413e-ac23-66fca8262f30	\N	0	0	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
24	2023-07-30 21:00:00+00	1900	Beklemede	asdas	asdasd	2023-07-30 17:17:04.45727+00	2023-07-30 17:17:04.45727+00	2	3	4	c31e1893-0790-413e-ac23-66fca8262f30	\N	4	1	\N	1	0	10	qweqw	asdasd	asdasdasd	qweqweqw	\N	\N
25	2023-07-30 21:00:00+00	1900	Beklemede	weqwe	asdasd	2023-07-30 17:49:56.072983+00	2023-07-30 17:49:56.072983+00	2	3	4	c31e1893-0790-413e-ac23-66fca8262f30	10	6	1	\N	1	0	15	sadasxcvx	xcvxcvxcv	asdasd	qweqwe	\N	\N
26	2023-07-30 21:00:00+00	1900	Beklemede	qweqw	qweqw	2023-07-30 17:56:08.37444+00	2023-07-30 20:52:42.948674+00	2	3	4	c31e1893-0790-413e-ac23-66fca8262f30	10	5	1	\N	1	0	20	asdasd	qweqwe	qweqw	qweqwe	{"value":"tl","label":"TL"}	{"value":"eu","label":"EU"}
\.


--
-- Data for Name: sections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sections (id, "sectionName", city, district, street, description) FROM stdin;
1	Atat├╝rk Havaliman─▒	{"value":"34","label":"─░STANBUL"}	{"value":"1166","label":"BAKIRK├ûY"}	Ye┼şilk├Ây	Gara demlik ├ğay─▒n─▒n yan─▒
2	Kirazl─▒ Metro	{"value":"34","label":"─░STANBUL"}	{"value":"2004","label":"BA─ŞCILAR"}	Kirazl─▒ mahallesi	Yunus emre hastanesinin kar┼ş─▒s─▒
3	Sabiha G├Âk├ğen Havaliman─▒	{"value":"34","label":"─░STANBUL"}	{"value":"1835","label":"PEND─░K"}	Sanayi	Sabiha G├Âk├ğen havaliman─▒
4	Ba─şc─▒lar Meydan	{"value":"34","label":"─░STANBUL"}	{"value":"2004","label":"BA─ŞCILAR"}	Ba─şc─▒lar Meydan	Ba─şc─▒lar Meydan
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, role) FROM stdin;
6cb0b04d-827b-4f2a-b1e8-ab3f27b43830	admin	$2b$10$KwB/XMKt..XgbPLvnofubO/3S4Pu.IFBsFVK7Fi/otzYbjd.QXMD2	ADMIN
c31e1893-0790-413e-ac23-66fca8262f30	admin@admin.com	$2b$10$Gxq7F/H6XZ8eRmshl3zzUuUoXWCf5eu.kZCTUzrz9WcLStT5290oC	ADMIN
95f8a36e-a8db-4090-879c-8517a3e37f19	tugay	$2b$10$WNFrh.scx6ASqTwTconi4uMvMuD59bVuTOk2FzmjY.GZTJ6mFT.O2	AGENT
ffb60bd8-55e0-40a8-a15b-f7a41e94c851	Tugay2	$2b$10$ZGpjt7t39JDJwWh2gcqEeeakWUcJA7Stt/CwEq7FtpAteWbQC7bfm	AGENT
1b3c3058-b8ad-46b0-b729-88a4831702ce	Ata	$2b$10$WNFrh.scx6ASqTwTconi4uMvMuD59bVuTOk2FzmjY.GZTJ6mFT.O2	AGENT
\.


--
-- Name: agents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agents_id_seq', 79, true);


--
-- Name: cars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cars_id_seq', 38, true);


--
-- Name: colors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.colors_id_seq', 3, true);


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 7, true);


--
-- Name: prices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.prices_id_seq', 7, true);


--
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_id_seq', 26, true);


--
-- Name: sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sections_id_seq', 4, true);


--
-- Name: prices PK_2e40b9e4e631a53cd514d82ccd2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT "PK_2e40b9e4e631a53cd514d82ccd2" PRIMARY KEY (id);


--
-- Name: colors PK_3a62edc12d29307872ab1777ced; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY (id);


--
-- Name: agents PK_9c653f28ae19c5884d5baf6a1d9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agents
    ADD CONSTRAINT "PK_9c653f28ae19c5884d5baf6a1d9" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: employees PK_b9535a98350d5b26e7eb0c26af4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY (id);


--
-- Name: reservations PK_da95cef71b617ac35dc5bcda243; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY (id);


--
-- Name: sections PK_f9749dd3bffd880a497d007e450; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT "PK_f9749dd3bffd880a497d007e450" PRIMARY KEY (id);


--
-- Name: cars PK_fc218aa84e79b477d55322271b6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY (id);


--
-- Name: agents UQ_1ea6b2ce044724d3254d19ab922; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agents
    ADD CONSTRAINT "UQ_1ea6b2ce044724d3254d19ab922" UNIQUE (name);


--
-- Name: users UQ_fe0bb3f6520ee0469504521e710; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);


--
-- Name: reservations FK_0a025d80eb85f49eae4307eb960; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT "FK_0a025d80eb85f49eae4307eb960" FOREIGN KEY ("fromId") REFERENCES public.sections(id);


--
-- Name: prices FK_19e0ad597e0892afc74b4f4e352; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT "FK_19e0ad597e0892afc74b4f4e352" FOREIGN KEY ("carId") REFERENCES public.cars(id);


--
-- Name: prices FK_23ee708e8c7fa69654667f8c861; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT "FK_23ee708e8c7fa69654667f8c861" FOREIGN KEY ("toId") REFERENCES public.sections(id) ON DELETE CASCADE;


--
-- Name: reservations FK_4e644255471084cde8f723921a6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT "FK_4e644255471084cde8f723921a6" FOREIGN KEY ("toId") REFERENCES public.sections(id);


--
-- Name: employees FK_52f0e9962e2240ac00f7ed5ba3b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "FK_52f0e9962e2240ac00f7ed5ba3b" FOREIGN KEY ("carId") REFERENCES public.cars(id);


--
-- Name: reservations FK_585ea7e0e4fa121d3c15a557475; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT "FK_585ea7e0e4fa121d3c15a557475" FOREIGN KEY ("carId") REFERENCES public.cars(id);


--
-- Name: prices FK_96855985af4691b83b28f680a14; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT "FK_96855985af4691b83b28f680a14" FOREIGN KEY ("agentId") REFERENCES public.agents(id);


--
-- Name: reservations FK_aa0e1cc2c4f54da32bf8282154c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: reservations FK_f56698162634da691f47c3ed249; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT "FK_f56698162634da691f47c3ed249" FOREIGN KEY ("agentId") REFERENCES public.agents(id);


--
-- Name: prices FK_fdac1a096c732fbc0d6834e201b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT "FK_fdac1a096c732fbc0d6834e201b" FOREIGN KEY ("fromId") REFERENCES public.sections(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


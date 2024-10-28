<script lang="ts">
    export let data;
</script>
<style>
    body {
  height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  filter: drop-shadow(0 0 10px white);
}

.snow {
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgb(var(--color-primary-500));
  box-shadow: 0 0 10px rgb(var(--color-primary-500));
  /* border-radius: ; */
}
.snow:nth-child(1) {
  opacity: 0.7156;
  transform: translate(25.5959vw, -10px) scale(0.1245);
  animation: fall-1 25s -10s linear infinite;
}
@keyframes fall-1 {
  71.774% {
    transform: translate(25.5337vw, 71.774vh) scale(0.1245);
  }
  to {
    transform: translate(25.5648vw, 100vh) scale(0.1245);
  }
}
.snow:nth-child(2) {
  opacity: 0.0865;
  transform: translate(53.518vw, -10px) scale(0.9147);
  animation: fall-2 16s -12s linear infinite;
}
@keyframes fall-2 {
  72.34% {
    transform: translate(46.4582vw, 72.34vh) scale(0.9147);
  }
  to {
    transform: translate(49.9881vw, 100vh) scale(0.9147);
  }
}
.snow:nth-child(3) {
  opacity: 0.898;
  transform: translate(57.2923vw, -10px) scale(0.4787);
  animation: fall-3 27s -22s linear infinite;
}
@keyframes fall-3 {
  53.89% {
    transform: translate(51.0456vw, 53.89vh) scale(0.4787);
  }
  to {
    transform: translate(54.16895vw, 100vh) scale(0.4787);
  }
}
.snow:nth-child(4) {
  opacity: 0.5771;
  transform: translate(20.3079vw, -10px) scale(0.8019);
  animation: fall-4 11s -28s linear infinite;
}
@keyframes fall-4 {
  74.65% {
    transform: translate(21.8975vw, 74.65vh) scale(0.8019);
  }
  to {
    transform: translate(21.1027vw, 100vh) scale(0.8019);
  }
}
.snow:nth-child(5) {
  opacity: 0.3059;
  transform: translate(64.8441vw, -10px) scale(0.6199);
  animation: fall-5 16s -30s linear infinite;
}
@keyframes fall-5 {
  53.253% {
    transform: translate(63.7508vw, 53.253vh) scale(0.6199);
  }
  to {
    transform: translate(64.29745vw, 100vh) scale(0.6199);
  }
}
.snow:nth-child(6) {
  opacity: 0.9059;
  transform: translate(98.8683vw, -10px) scale(0.5487);
  animation: fall-6 23s -23s linear infinite;
}
@keyframes fall-6 {
  64.245% {
    transform: translate(96.6785vw, 64.245vh) scale(0.5487);
  }
  to {
    transform: translate(97.7734vw, 100vh) scale(0.5487);
  }
}
.snow:nth-child(7) {
  opacity: 0.8888;
  transform: translate(55.7355vw, -10px) scale(0.204);
  animation: fall-7 14s -26s linear infinite;
}
@keyframes fall-7 {
  63.869% {
    transform: translate(59.2713vw, 63.869vh) scale(0.204);
  }
  to {
    transform: translate(57.5034vw, 100vh) scale(0.204);
  }
}
.snow:nth-child(8) {
  opacity: 0.2961;
  transform: translate(23.3659vw, -10px) scale(0.6018);
  animation: fall-8 23s -1s linear infinite;
}
@keyframes fall-8 {
  65.95% {
    transform: translate(17.652vw, 65.95vh) scale(0.6018);
  }
  to {
    transform: translate(20.50895vw, 100vh) scale(0.6018);
  }
}
.snow:nth-child(9) {
  opacity: 0.5885;
  transform: translate(2.3832vw, -10px) scale(0.712);
  animation: fall-9 12s -1s linear infinite;
}
@keyframes fall-9 {
  60.439% {
    transform: translate(5.1137vw, 60.439vh) scale(0.712);
  }
  to {
    transform: translate(3.74845vw, 100vh) scale(0.712);
  }
}
.snow:nth-child(10) {
  opacity: 0.5595;
  transform: translate(28.8851vw, -10px) scale(0.8166);
  animation: fall-10 15s -8s linear infinite;
}
@keyframes fall-10 {
  46.907% {
    transform: translate(27.903vw, 46.907vh) scale(0.8166);
  }
  to {
    transform: translate(28.39405vw, 100vh) scale(0.8166);
  }
}
.snow:nth-child(11) {
  opacity: 0.1479;
  transform: translate(26.709vw, -10px) scale(0.4012);
  animation: fall-11 25s -20s linear infinite;
}
@keyframes fall-11 {
  62.467% {
    transform: translate(36.2317vw, 62.467vh) scale(0.4012);
  }
  to {
    transform: translate(31.47035vw, 100vh) scale(0.4012);
  }
}
.snow:nth-child(12) {
  opacity: 0.8109;
  transform: translate(53.8609vw, -10px) scale(0.3439);
  animation: fall-12 20s -14s linear infinite;
}
@keyframes fall-12 {
  60.384% {
    transform: translate(63.7849vw, 60.384vh) scale(0.3439);
  }
  to {
    transform: translate(58.8229vw, 100vh) scale(0.3439);
  }
}
.snow:nth-child(13) {
  opacity: 0.119;
  transform: translate(64.5726vw, -10px) scale(0.8446);
  animation: fall-13 27s -1s linear infinite;
}
@keyframes fall-13 {
  30.781% {
    transform: translate(71.5784vw, 30.781vh) scale(0.8446);
  }
  to {
    transform: translate(68.0755vw, 100vh) scale(0.8446);
  }
}
.snow:nth-child(14) {
  opacity: 0.4734;
  transform: translate(18.4384vw, -10px) scale(0.1797);
  animation: fall-14 21s -2s linear infinite;
}
@keyframes fall-14 {
  37.361% {
    transform: translate(20.6028vw, 37.361vh) scale(0.1797);
  }
  to {
    transform: translate(19.5206vw, 100vh) scale(0.1797);
  }
}
.snow:nth-child(15) {
  opacity: 0.5538;
  transform: translate(78.258vw, -10px) scale(0.0486);
  animation: fall-15 27s -21s linear infinite;
}
@keyframes fall-15 {
  71.772% {
    transform: translate(87.2141vw, 71.772vh) scale(0.0486);
  }
  to {
    transform: translate(82.73605vw, 100vh) scale(0.0486);
  }
}
.snow:nth-child(16) {
  opacity: 0.1269;
  transform: translate(25.6527vw, -10px) scale(0.041);
  animation: fall-16 20s -28s linear infinite;
}
@keyframes fall-16 {
  47.811% {
    transform: translate(35.2791vw, 47.811vh) scale(0.041);
  }
  to {
    transform: translate(30.4659vw, 100vh) scale(0.041);
  }
}
.snow:nth-child(17) {
  opacity: 0.3828;
  transform: translate(53.3716vw, -10px) scale(0.2126);
  animation: fall-17 15s -7s linear infinite;
}
@keyframes fall-17 {
  51.373% {
    transform: translate(45.6733vw, 51.373vh) scale(0.2126);
  }
  to {
    transform: translate(49.52245vw, 100vh) scale(0.2126);
  }
}
.snow:nth-child(18) {
  opacity: 0.1672;
  transform: translate(3.3907vw, -10px) scale(0.889);
  animation: fall-18 22s -17s linear infinite;
}
@keyframes fall-18 {
  74.228% {
    transform: translate(-3.6722vw, 74.228vh) scale(0.889);
  }
  to {
    transform: translate(-0.14075vw, 100vh) scale(0.889);
  }
}
.snow:nth-child(19) {
  opacity: 0.019;
  transform: translate(66.9629vw, -10px) scale(0.5722);
  animation: fall-19 21s -16s linear infinite;
}
@keyframes fall-19 {
  56.197% {
    transform: translate(73.115vw, 56.197vh) scale(0.5722);
  }
  to {
    transform: translate(70.03895vw, 100vh) scale(0.5722);
  }
}
.snow:nth-child(20) {
  opacity: 0.3956;
  transform: translate(12.0938vw, -10px) scale(0.9168);
  animation: fall-20 24s -2s linear infinite;
}
@keyframes fall-20 {
  50.46% {
    transform: translate(3.1487vw, 50.46vh) scale(0.9168);
  }
  to {
    transform: translate(7.62125vw, 100vh) scale(0.9168);
  }
}
.snow:nth-child(21) {
  opacity: 0.8029;
  transform: translate(27.5652vw, -10px) scale(0.8142);
  animation: fall-21 14s -25s linear infinite;
}
@keyframes fall-21 {
  56.206% {
    transform: translate(28.6811vw, 56.206vh) scale(0.8142);
  }
  to {
    transform: translate(28.12315vw, 100vh) scale(0.8142);
  }
}
.snow:nth-child(22) {
  opacity: 0.3089;
  transform: translate(53.3544vw, -10px) scale(0.3793);
  animation: fall-22 14s -17s linear infinite;
}
@keyframes fall-22 {
  73.752% {
    transform: translate(44.0243vw, 73.752vh) scale(0.3793);
  }
  to {
    transform: translate(48.68935vw, 100vh) scale(0.3793);
  }
}
.snow:nth-child(23) {
  opacity: 0.3492;
  transform: translate(89.9331vw, -10px) scale(0.846);
  animation: fall-23 15s -24s linear infinite;
}
@keyframes fall-23 {
  32.113% {
    transform: translate(97.1754vw, 32.113vh) scale(0.846);
  }
  to {
    transform: translate(93.55425vw, 100vh) scale(0.846);
  }
}
.snow:nth-child(24) {
  opacity: 0.5277;
  transform: translate(26.5496vw, -10px) scale(0.233);
  animation: fall-24 10s -16s linear infinite;
}
@keyframes fall-24 {
  49.053% {
    transform: translate(29.0504vw, 49.053vh) scale(0.233);
  }
  to {
    transform: translate(27.8vw, 100vh) scale(0.233);
  }
}
.snow:nth-child(25) {
  opacity: 0.3585;
  transform: translate(4.4523vw, -10px) scale(0.7135);
  animation: fall-25 25s -27s linear infinite;
}
@keyframes fall-25 {
  43.569% {
    transform: translate(9.1764vw, 43.569vh) scale(0.7135);
  }
  to {
    transform: translate(6.81435vw, 100vh) scale(0.7135);
  }
}
.snow:nth-child(26) {
  opacity: 0.9049;
  transform: translate(16.5887vw, -10px) scale(0.1144);
  animation: fall-26 27s -18s linear infinite;
}
@keyframes fall-26 {
  48.813% {
    transform: translate(14.4021vw, 48.813vh) scale(0.1144);
  }
  to {
    transform: translate(15.4954vw, 100vh) scale(0.1144);
  }
}
.snow:nth-child(27) {
  opacity: 0.1598;
  transform: translate(13.5985vw, -10px) scale(0.6756);
  animation: fall-27 12s -11s linear infinite;
}
@keyframes fall-27 {
  31.464% {
    transform: translate(10.1277vw, 31.464vh) scale(0.6756);
  }
  to {
    transform: translate(11.8631vw, 100vh) scale(0.6756);
  }
}
.snow:nth-child(28) {
  opacity: 0.0003;
  transform: translate(46.7894vw, -10px) scale(0.6182);
  animation: fall-28 20s -27s linear infinite;
}
@keyframes fall-28 {
  31.605% {
    transform: translate(37.0338vw, 31.605vh) scale(0.6182);
  }
  to {
    transform: translate(41.9116vw, 100vh) scale(0.6182);
  }
}
.snow:nth-child(29) {
  opacity: 0.6601;
  transform: translate(76.2025vw, -10px) scale(0.7078);
  animation: fall-29 23s -14s linear infinite;
}
@keyframes fall-29 {
  58.859% {
    transform: translate(75.0738vw, 58.859vh) scale(0.7078);
  }
  to {
    transform: translate(75.63815vw, 100vh) scale(0.7078);
  }
}
.snow:nth-child(30) {
  opacity: 0.1344;
  transform: translate(6.8282vw, -10px) scale(0.7267);
  animation: fall-30 22s -8s linear infinite;
}
@keyframes fall-30 {
  30.762% {
    transform: translate(0.358vw, 30.762vh) scale(0.7267);
  }
  to {
    transform: translate(3.5931vw, 100vh) scale(0.7267);
  }
}
.snow:nth-child(31) {
  opacity: 0.0429;
  transform: translate(5.7231vw, -10px) scale(0.9039);
  animation: fall-31 20s -25s linear infinite;
}
@keyframes fall-31 {
  57.863% {
    transform: translate(2.9671vw, 57.863vh) scale(0.9039);
  }
  to {
    transform: translate(4.3451vw, 100vh) scale(0.9039);
  }
}
.snow:nth-child(32) {
  opacity: 0.5366;
  transform: translate(11.5671vw, -10px) scale(0.2813);
  animation: fall-32 25s -4s linear infinite;
}
@keyframes fall-32 {
  54.631% {
    transform: translate(5.2972vw, 54.631vh) scale(0.2813);
  }
  to {
    transform: translate(8.43215vw, 100vh) scale(0.2813);
  }
}
.snow:nth-child(33) {
  opacity: 0.8139;
  transform: translate(87.0941vw, -10px) scale(0.6324);
  animation: fall-33 14s -19s linear infinite;
}
@keyframes fall-33 {
  51.179% {
    transform: translate(89.8081vw, 51.179vh) scale(0.6324);
  }
  to {
    transform: translate(88.4511vw, 100vh) scale(0.6324);
  }
}
.snow:nth-child(34) {
  opacity: 0.7418;
  transform: translate(23.7163vw, -10px) scale(0.5723);
  animation: fall-34 10s -11s linear infinite;
}
@keyframes fall-34 {
  74.047% {
    transform: translate(16.6965vw, 74.047vh) scale(0.5723);
  }
  to {
    transform: translate(20.2064vw, 100vh) scale(0.5723);
  }
}
.snow:nth-child(35) {
  opacity: 0.9479;
  transform: translate(27.0192vw, -10px) scale(0.4138);
  animation: fall-35 10s -28s linear infinite;
}
@keyframes fall-35 {
  55.037% {
    transform: translate(26.6401vw, 55.037vh) scale(0.4138);
  }
  to {
    transform: translate(26.82965vw, 100vh) scale(0.4138);
  }
}
.snow:nth-child(36) {
  opacity: 0.2449;
  transform: translate(41.5051vw, -10px) scale(0.6488);
  animation: fall-36 23s -26s linear infinite;
}
@keyframes fall-36 {
  62.063% {
    transform: translate(48.2375vw, 62.063vh) scale(0.6488);
  }
  to {
    transform: translate(44.8713vw, 100vh) scale(0.6488);
  }
}
.snow:nth-child(37) {
  opacity: 0.6329;
  transform: translate(31.9524vw, -10px) scale(0.94);
  animation: fall-37 20s -1s linear infinite;
}
@keyframes fall-37 {
  31.592% {
    transform: translate(30.0218vw, 31.592vh) scale(0.94);
  }
  to {
    transform: translate(30.9871vw, 100vh) scale(0.94);
  }
}
.snow:nth-child(38) {
  opacity: 0.827;
  transform: translate(70.4741vw, -10px) scale(0.6658);
  animation: fall-38 15s -30s linear infinite;
}
@keyframes fall-38 {
  79.185% {
    transform: translate(75.9664vw, 79.185vh) scale(0.6658);
  }
  to {
    transform: translate(73.22025vw, 100vh) scale(0.6658);
  }
}
.snow:nth-child(39) {
  opacity: 0.2097;
  transform: translate(45.4064vw, -10px) scale(0.6449);
  animation: fall-39 11s -2s linear infinite;
}
@keyframes fall-39 {
  65.529% {
    transform: translate(36.3669vw, 65.529vh) scale(0.6449);
  }
  to {
    transform: translate(40.88665vw, 100vh) scale(0.6449);
  }
}
.snow:nth-child(40) {
  opacity: 0.8714;
  transform: translate(20.3692vw, -10px) scale(0.5434);
  animation: fall-40 20s -9s linear infinite;
}
@keyframes fall-40 {
  77.467% {
    transform: translate(18.5355vw, 77.467vh) scale(0.5434);
  }
  to {
    transform: translate(19.45235vw, 100vh) scale(0.5434);
  }
}
.snow:nth-child(41) {
  opacity: 0.9193;
  transform: translate(51.3837vw, -10px) scale(0.3518);
  animation: fall-41 23s -9s linear infinite;
}
@keyframes fall-41 {
  64.895% {
    transform: translate(50.0184vw, 64.895vh) scale(0.3518);
  }
  to {
    transform: translate(50.70105vw, 100vh) scale(0.3518);
  }
}
.snow:nth-child(42) {
  opacity: 0.0226;
  transform: translate(37.4843vw, -10px) scale(0.4553);
  animation: fall-42 11s -27s linear infinite;
}
@keyframes fall-42 {
  39.541% {
    transform: translate(42.4037vw, 39.541vh) scale(0.4553);
  }
  to {
    transform: translate(39.944vw, 100vh) scale(0.4553);
  }
}
.snow:nth-child(43) {
  opacity: 0.3248;
  transform: translate(9.4958vw, -10px) scale(0.9595);
  animation: fall-43 19s -21s linear infinite;
}
@keyframes fall-43 {
  48.852% {
    transform: translate(2.1497vw, 48.852vh) scale(0.9595);
  }
  to {
    transform: translate(5.82275vw, 100vh) scale(0.9595);
  }
}
.snow:nth-child(44) {
  opacity: 0.3288;
  transform: translate(23.9244vw, -10px) scale(0.8432);
  animation: fall-44 22s -19s linear infinite;
}
@keyframes fall-44 {
  68.601% {
    transform: translate(23.6525vw, 68.601vh) scale(0.8432);
  }
  to {
    transform: translate(23.78845vw, 100vh) scale(0.8432);
  }
}
.snow:nth-child(45) {
  opacity: 0.2948;
  transform: translate(65.8161vw, -10px) scale(0.9683);
  animation: fall-45 14s -12s linear infinite;
}
@keyframes fall-45 {
  73.527% {
    transform: translate(72.7325vw, 73.527vh) scale(0.9683);
  }
  to {
    transform: translate(69.2743vw, 100vh) scale(0.9683);
  }
}
.snow:nth-child(46) {
  opacity: 0.5127;
  transform: translate(73.7862vw, -10px) scale(0.6676);
  animation: fall-46 11s -28s linear infinite;
}
@keyframes fall-46 {
  30.49% {
    transform: translate(79.2212vw, 30.49vh) scale(0.6676);
  }
  to {
    transform: translate(76.5037vw, 100vh) scale(0.6676);
  }
}
.snow:nth-child(47) {
  opacity: 0.7418;
  transform: translate(51.0701vw, -10px) scale(0.0406);
  animation: fall-47 24s -2s linear infinite;
}
@keyframes fall-47 {
  53.68% {
    transform: translate(55.3247vw, 53.68vh) scale(0.0406);
  }
  to {
    transform: translate(53.1974vw, 100vh) scale(0.0406);
  }
}
.snow:nth-child(48) {
  opacity: 0.7037;
  transform: translate(16.7902vw, -10px) scale(0.8707);
  animation: fall-48 10s -14s linear infinite;
}
@keyframes fall-48 {
  30.285% {
    transform: translate(13.0353vw, 30.285vh) scale(0.8707);
  }
  to {
    transform: translate(14.91275vw, 100vh) scale(0.8707);
  }
}
.snow:nth-child(49) {
  opacity: 0.4025;
  transform: translate(21.3227vw, -10px) scale(0.7286);
  animation: fall-49 18s -8s linear infinite;
}
@keyframes fall-49 {
  60.931% {
    transform: translate(28.2089vw, 60.931vh) scale(0.7286);
  }
  to {
    transform: translate(24.7658vw, 100vh) scale(0.7286);
  }
}
.snow:nth-child(50) {
  opacity: 0.1859;
  transform: translate(42.6177vw, -10px) scale(0.4052);
  animation: fall-50 23s -14s linear infinite;
}
@keyframes fall-50 {
  35.867% {
    transform: translate(39.8796vw, 35.867vh) scale(0.4052);
  }
  to {
    transform: translate(41.24865vw, 100vh) scale(0.4052);
  }
}
.snow:nth-child(51) {
  opacity: 0.3257;
  transform: translate(1.7667vw, -10px) scale(0.2957);
  animation: fall-51 13s -24s linear infinite;
}
@keyframes fall-51 {
  67.835% {
    transform: translate(-3.7062vw, 67.835vh) scale(0.2957);
  }
  to {
    transform: translate(-0.96975vw, 100vh) scale(0.2957);
  }
}
.snow:nth-child(52) {
  opacity: 0.9039;
  transform: translate(64.6406vw, -10px) scale(0.525);
  animation: fall-52 15s -7s linear infinite;
}
@keyframes fall-52 {
  30.27% {
    transform: translate(64.1495vw, 30.27vh) scale(0.525);
  }
  to {
    transform: translate(64.39505vw, 100vh) scale(0.525);
  }
}
.snow:nth-child(53) {
  opacity: 0.6283;
  transform: translate(57.6335vw, -10px) scale(0.4766);
  animation: fall-53 28s -28s linear infinite;
}
@keyframes fall-53 {
  43.733% {
    transform: translate(58.5152vw, 43.733vh) scale(0.4766);
  }
  to {
    transform: translate(58.07435vw, 100vh) scale(0.4766);
  }
}
.snow:nth-child(54) {
  opacity: 0.1612;
  transform: translate(45.6899vw, -10px) scale(0.1585);
  animation: fall-54 18s -12s linear infinite;
}
@keyframes fall-54 {
  58.18% {
    transform: translate(46.9883vw, 58.18vh) scale(0.1585);
  }
  to {
    transform: translate(46.3391vw, 100vh) scale(0.1585);
  }
}
.snow:nth-child(55) {
  opacity: 0.5662;
  transform: translate(41.7494vw, -10px) scale(0.1068);
  animation: fall-55 17s -26s linear infinite;
}
@keyframes fall-55 {
  40.444% {
    transform: translate(51.294vw, 40.444vh) scale(0.1068);
  }
  to {
    transform: translate(46.5217vw, 100vh) scale(0.1068);
  }
}
.snow:nth-child(56) {
  opacity: 0.0249;
  transform: translate(5.8392vw, -10px) scale(0.083);
  animation: fall-56 13s -16s linear infinite;
}
@keyframes fall-56 {
  64.919% {
    transform: translate(11.5602vw, 64.919vh) scale(0.083);
  }
  to {
    transform: translate(8.6997vw, 100vh) scale(0.083);
  }
}
.snow:nth-child(57) {
  opacity: 0.3593;
  transform: translate(76.2536vw, -10px) scale(0.7902);
  animation: fall-57 20s -16s linear infinite;
}
@keyframes fall-57 {
  79.533% {
    transform: translate(67.0421vw, 79.533vh) scale(0.7902);
  }
  to {
    transform: translate(71.64785vw, 100vh) scale(0.7902);
  }
}
.snow:nth-child(58) {
  opacity: 0.8942;
  transform: translate(91.1993vw, -10px) scale(0.8118);
  animation: fall-58 21s -25s linear infinite;
}
@keyframes fall-58 {
  65.284% {
    transform: translate(92.4713vw, 65.284vh) scale(0.8118);
  }
  to {
    transform: translate(91.8353vw, 100vh) scale(0.8118);
  }
}
.snow:nth-child(59) {
  opacity: 0.4765;
  transform: translate(3.0578vw, -10px) scale(0.9876);
  animation: fall-59 24s -23s linear infinite;
}
@keyframes fall-59 {
  47.642% {
    transform: translate(-1.8919vw, 47.642vh) scale(0.9876);
  }
  to {
    transform: translate(0.58295vw, 100vh) scale(0.9876);
  }
}
.snow:nth-child(60) {
  opacity: 0.6385;
  transform: translate(64.5971vw, -10px) scale(0.5272);
  animation: fall-60 27s -11s linear infinite;
}
@keyframes fall-60 {
  31.008% {
    transform: translate(67.3282vw, 31.008vh) scale(0.5272);
  }
  to {
    transform: translate(65.96265vw, 100vh) scale(0.5272);
  }
}
.snow:nth-child(61) {
  opacity: 0.5468;
  transform: translate(59.6834vw, -10px) scale(0.8289);
  animation: fall-61 22s -5s linear infinite;
}
@keyframes fall-61 {
  78.449% {
    transform: translate(52.7175vw, 78.449vh) scale(0.8289);
  }
  to {
    transform: translate(56.20045vw, 100vh) scale(0.8289);
  }
}
.snow:nth-child(62) {
  opacity: 0.5895;
  transform: translate(96.6145vw, -10px) scale(0.4101);
  animation: fall-62 18s -13s linear infinite;
}
@keyframes fall-62 {
  53.964% {
    transform: translate(96.2561vw, 53.964vh) scale(0.4101);
  }
  to {
    transform: translate(96.4353vw, 100vh) scale(0.4101);
  }
}
.snow:nth-child(63) {
  opacity: 0.0983;
  transform: translate(46.2714vw, -10px) scale(0.9612);
  animation: fall-63 28s -29s linear infinite;
}
@keyframes fall-63 {
  39.333% {
    transform: translate(39.0443vw, 39.333vh) scale(0.9612);
  }
  to {
    transform: translate(42.65785vw, 100vh) scale(0.9612);
  }
}
.snow:nth-child(64) {
  opacity: 0.5997;
  transform: translate(23.4498vw, -10px) scale(0.4538);
  animation: fall-64 16s -11s linear infinite;
}
@keyframes fall-64 {
  52.136% {
    transform: translate(21.4196vw, 52.136vh) scale(0.4538);
  }
  to {
    transform: translate(22.4347vw, 100vh) scale(0.4538);
  }
}
.snow:nth-child(65) {
  opacity: 0.0539;
  transform: translate(7.2855vw, -10px) scale(0.4781);
  animation: fall-65 11s -24s linear infinite;
}
@keyframes fall-65 {
  57.484% {
    transform: translate(-1.1388vw, 57.484vh) scale(0.4781);
  }
  to {
    transform: translate(3.07335vw, 100vh) scale(0.4781);
  }
}
.snow:nth-child(66) {
  opacity: 0.1336;
  transform: translate(50.7895vw, -10px) scale(0.2476);
  animation: fall-66 16s -10s linear infinite;
}
@keyframes fall-66 {
  70.617% {
    transform: translate(55.5307vw, 70.617vh) scale(0.2476);
  }
  to {
    transform: translate(53.1601vw, 100vh) scale(0.2476);
  }
}
.snow:nth-child(67) {
  opacity: 0.3344;
  transform: translate(67.0631vw, -10px) scale(0.7595);
  animation: fall-67 23s -23s linear infinite;
}
@keyframes fall-67 {
  40.628% {
    transform: translate(57.432vw, 40.628vh) scale(0.7595);
  }
  to {
    transform: translate(62.24755vw, 100vh) scale(0.7595);
  }
}
.snow:nth-child(68) {
  opacity: 0.8436;
  transform: translate(7.1018vw, -10px) scale(0.2323);
  animation: fall-68 26s -18s linear infinite;
}
@keyframes fall-68 {
  43.591% {
    transform: translate(-1.7622vw, 43.591vh) scale(0.2323);
  }
  to {
    transform: translate(2.6698vw, 100vh) scale(0.2323);
  }
}
.snow:nth-child(69) {
  opacity: 0.1967;
  transform: translate(35.6062vw, -10px) scale(0.2708);
  animation: fall-69 15s -1s linear infinite;
}
@keyframes fall-69 {
  66.119% {
    transform: translate(45.5857vw, 66.119vh) scale(0.2708);
  }
  to {
    transform: translate(40.59595vw, 100vh) scale(0.2708);
  }
}
.snow:nth-child(70) {
  opacity: 0.4129;
  transform: translate(10.7336vw, -10px) scale(0.7542);
  animation: fall-70 17s -30s linear infinite;
}
@keyframes fall-70 {
  38.897% {
    transform: translate(18.0451vw, 38.897vh) scale(0.7542);
  }
  to {
    transform: translate(14.38935vw, 100vh) scale(0.7542);
  }
}
.snow:nth-child(71) {
  opacity: 0.1855;
  transform: translate(83.0357vw, -10px) scale(0.4839);
  animation: fall-71 13s -6s linear infinite;
}
@keyframes fall-71 {
  67.381% {
    transform: translate(84.8292vw, 67.381vh) scale(0.4839);
  }
  to {
    transform: translate(83.93245vw, 100vh) scale(0.4839);
  }
}
.snow:nth-child(72) {
  opacity: 0.9822;
  transform: translate(85.9016vw, -10px) scale(0.5734);
  animation: fall-72 11s -1s linear infinite;
}
@keyframes fall-72 {
  62.356% {
    transform: translate(88.8316vw, 62.356vh) scale(0.5734);
  }
  to {
    transform: translate(87.3666vw, 100vh) scale(0.5734);
  }
}
.snow:nth-child(73) {
  opacity: 0.6307;
  transform: translate(49.4712vw, -10px) scale(0.601);
  animation: fall-73 24s -6s linear infinite;
}
@keyframes fall-73 {
  63.452% {
    transform: translate(55.2456vw, 63.452vh) scale(0.601);
  }
  to {
    transform: translate(52.3584vw, 100vh) scale(0.601);
  }
}
.snow:nth-child(74) {
  opacity: 0.0693;
  transform: translate(77.6865vw, -10px) scale(0.5949);
  animation: fall-74 29s -10s linear infinite;
}
@keyframes fall-74 {
  48.087% {
    transform: translate(75.4303vw, 48.087vh) scale(0.5949);
  }
  to {
    transform: translate(76.5584vw, 100vh) scale(0.5949);
  }
}
.snow:nth-child(75) {
  opacity: 0.5906;
  transform: translate(74.0128vw, -10px) scale(0.3177);
  animation: fall-75 12s -15s linear infinite;
}
@keyframes fall-75 {
  40.729% {
    transform: translate(64.572vw, 40.729vh) scale(0.3177);
  }
  to {
    transform: translate(69.2924vw, 100vh) scale(0.3177);
  }
}
.snow:nth-child(76) {
  opacity: 0.783;
  transform: translate(25.9558vw, -10px) scale(0.6894);
  animation: fall-76 14s -2s linear infinite;
}
@keyframes fall-76 {
  51.017% {
    transform: translate(19.8278vw, 51.017vh) scale(0.6894);
  }
  to {
    transform: translate(22.8918vw, 100vh) scale(0.6894);
  }
}
.snow:nth-child(77) {
  opacity: 0.383;
  transform: translate(80.9921vw, -10px) scale(0.9119);
  animation: fall-77 25s -29s linear infinite;
}
@keyframes fall-77 {
  35.762% {
    transform: translate(71.7559vw, 35.762vh) scale(0.9119);
  }
  to {
    transform: translate(76.374vw, 100vh) scale(0.9119);
  }
}
.snow:nth-child(78) {
  opacity: 0.4761;
  transform: translate(36.9787vw, -10px) scale(0.9575);
  animation: fall-78 24s -16s linear infinite;
}
@keyframes fall-78 {
  31.465% {
    transform: translate(45.269vw, 31.465vh) scale(0.9575);
  }
  to {
    transform: translate(41.12385vw, 100vh) scale(0.9575);
  }
}
.snow:nth-child(79) {
  opacity: 0.3637;
  transform: translate(46.5446vw, -10px) scale(0.7481);
  animation: fall-79 23s -2s linear infinite;
}
@keyframes fall-79 {
  44.318% {
    transform: translate(44.9027vw, 44.318vh) scale(0.7481);
  }
  to {
    transform: translate(45.72365vw, 100vh) scale(0.7481);
  }
}
.snow:nth-child(80) {
  opacity: 0.9601;
  transform: translate(73.0833vw, -10px) scale(0.5248);
  animation: fall-80 20s -4s linear infinite;
}
@keyframes fall-80 {
  50.302% {
    transform: translate(65.0571vw, 50.302vh) scale(0.5248);
  }
  to {
    transform: translate(69.0702vw, 100vh) scale(0.5248);
  }
}
.snow:nth-child(81) {
  opacity: 0.2028;
  transform: translate(16.1729vw, -10px) scale(0.9042);
  animation: fall-81 20s -5s linear infinite;
}
@keyframes fall-81 {
  51.519% {
    transform: translate(12.9803vw, 51.519vh) scale(0.9042);
  }
  to {
    transform: translate(14.5766vw, 100vh) scale(0.9042);
  }
}
.snow:nth-child(82) {
  opacity: 0.5244;
  transform: translate(39.8785vw, -10px) scale(0.7426);
  animation: fall-82 22s -2s linear infinite;
}
@keyframes fall-82 {
  52.298% {
    transform: translate(33.9264vw, 52.298vh) scale(0.7426);
  }
  to {
    transform: translate(36.90245vw, 100vh) scale(0.7426);
  }
}
.snow:nth-child(83) {
  opacity: 0.464;
  transform: translate(20.0444vw, -10px) scale(0.3878);
  animation: fall-83 15s -3s linear infinite;
}
@keyframes fall-83 {
  75.012% {
    transform: translate(20.5204vw, 75.012vh) scale(0.3878);
  }
  to {
    transform: translate(20.2824vw, 100vh) scale(0.3878);
  }
}
.snow:nth-child(84) {
  opacity: 0.1127;
  transform: translate(35.4699vw, -10px) scale(0.5873);
  animation: fall-84 10s -18s linear infinite;
}
@keyframes fall-84 {
  42.072% {
    transform: translate(26.5187vw, 42.072vh) scale(0.5873);
  }
  to {
    transform: translate(30.9943vw, 100vh) scale(0.5873);
  }
}
.snow:nth-child(85) {
  opacity: 0.2587;
  transform: translate(42.8504vw, -10px) scale(0.2875);
  animation: fall-85 29s -10s linear infinite;
}
@keyframes fall-85 {
  30.549% {
    transform: translate(49.3468vw, 30.549vh) scale(0.2875);
  }
  to {
    transform: translate(46.0986vw, 100vh) scale(0.2875);
  }
}
.snow:nth-child(86) {
  opacity: 0.215;
  transform: translate(96.822vw, -10px) scale(0.3321);
  animation: fall-86 11s -1s linear infinite;
}
@keyframes fall-86 {
  54.464% {
    transform: translate(105.6568vw, 54.464vh) scale(0.3321);
  }
  to {
    transform: translate(101.2394vw, 100vh) scale(0.3321);
  }
}
.snow:nth-child(87) {
  opacity: 0.7857;
  transform: translate(44.4188vw, -10px) scale(0.9695);
  animation: fall-87 29s -30s linear infinite;
}
@keyframes fall-87 {
  45.475% {
    transform: translate(52.4623vw, 45.475vh) scale(0.9695);
  }
  to {
    transform: translate(48.44055vw, 100vh) scale(0.9695);
  }
}
.snow:nth-child(88) {
  opacity: 0.3105;
  transform: translate(8.0156vw, -10px) scale(0.8114);
  animation: fall-88 30s -28s linear infinite;
}
@keyframes fall-88 {
  31.137% {
    transform: translate(8.9795vw, 31.137vh) scale(0.8114);
  }
  to {
    transform: translate(8.49755vw, 100vh) scale(0.8114);
  }
}
.snow:nth-child(89) {
  opacity: 0.8313;
  transform: translate(18.974vw, -10px) scale(0.8907);
  animation: fall-89 16s -2s linear infinite;
}
@keyframes fall-89 {
  37.983% {
    transform: translate(10.473vw, 37.983vh) scale(0.8907);
  }
  to {
    transform: translate(14.7235vw, 100vh) scale(0.8907);
  }
}
.snow:nth-child(90) {
  opacity: 0.5164;
  transform: translate(80.6733vw, -10px) scale(0.0855);
  animation: fall-90 20s -16s linear infinite;
}
@keyframes fall-90 {
  79.349% {
    transform: translate(72.2076vw, 79.349vh) scale(0.0855);
  }
  to {
    transform: translate(76.44045vw, 100vh) scale(0.0855);
  }
}
.snow:nth-child(91) {
  opacity: 0.2436;
  transform: translate(88.4195vw, -10px) scale(0.573);
  animation: fall-91 29s -13s linear infinite;
}
@keyframes fall-91 {
  63.293% {
    transform: translate(83.353vw, 63.293vh) scale(0.573);
  }
  to {
    transform: translate(85.88625vw, 100vh) scale(0.573);
  }
}
.snow:nth-child(92) {
  opacity: 0.4148;
  transform: translate(20.2778vw, -10px) scale(0.6222);
  animation: fall-92 30s -1s linear infinite;
}
@keyframes fall-92 {
  56.358% {
    transform: translate(18.1555vw, 56.358vh) scale(0.6222);
  }
  to {
    transform: translate(19.21665vw, 100vh) scale(0.6222);
  }
}
.snow:nth-child(93) {
  opacity: 0.8109;
  transform: translate(63.7835vw, -10px) scale(0.5022);
  animation: fall-93 27s -19s linear infinite;
}
@keyframes fall-93 {
  65.367% {
    transform: translate(73.536vw, 65.367vh) scale(0.5022);
  }
  to {
    transform: translate(68.65975vw, 100vh) scale(0.5022);
  }
}
.snow:nth-child(94) {
  opacity: 0.0408;
  transform: translate(81.8806vw, -10px) scale(0.9439);
  animation: fall-94 20s -12s linear infinite;
}
@keyframes fall-94 {
  54.627% {
    transform: translate(74.1836vw, 54.627vh) scale(0.9439);
  }
  to {
    transform: translate(78.0321vw, 100vh) scale(0.9439);
  }
}
.snow:nth-child(95) {
  opacity: 0.3471;
  transform: translate(30.9318vw, -10px) scale(0.6649);
  animation: fall-95 19s -25s linear infinite;
}
@keyframes fall-95 {
  60.891% {
    transform: translate(39.3309vw, 60.891vh) scale(0.6649);
  }
  to {
    transform: translate(35.13135vw, 100vh) scale(0.6649);
  }
}
.snow:nth-child(96) {
  opacity: 0.744;
  transform: translate(71.5494vw, -10px) scale(0.5987);
  animation: fall-96 19s -15s linear infinite;
}
@keyframes fall-96 {
  50.367% {
    transform: translate(61.8911vw, 50.367vh) scale(0.5987);
  }
  to {
    transform: translate(66.72025vw, 100vh) scale(0.5987);
  }
}
.snow:nth-child(97) {
  opacity: 0.3402;
  transform: translate(3.0863vw, -10px) scale(0.8833);
  animation: fall-97 20s -13s linear infinite;
}
@keyframes fall-97 {
  66.746% {
    transform: translate(-3.1177vw, 66.746vh) scale(0.8833);
  }
  to {
    transform: translate(-0.0157vw, 100vh) scale(0.8833);
  }
}
.snow:nth-child(98) {
  opacity: 0.8315;
  transform: translate(81.586vw, -10px) scale(0.9808);
  animation: fall-98 23s -7s linear infinite;
}
@keyframes fall-98 {
  70.5% {
    transform: translate(82.3935vw, 70.5vh) scale(0.9808);
  }
  to {
    transform: translate(81.98975vw, 100vh) scale(0.9808);
  }
}
.snow:nth-child(99) {
  opacity: 0.1573;
  transform: translate(66.4146vw, -10px) scale(0.053);
  animation: fall-99 16s -8s linear infinite;
}
@keyframes fall-99 {
  47.169% {
    transform: translate(58.9695vw, 47.169vh) scale(0.053);
  }
  to {
    transform: translate(62.69205vw, 100vh) scale(0.053);
  }
}
.snow:nth-child(100) {
  opacity: 0.7077;
  transform: translate(74.3943vw, -10px) scale(0.2218);
  animation: fall-100 13s -7s linear infinite;
}
@keyframes fall-100 {
  52.814% {
    transform: translate(72.0733vw, 52.814vh) scale(0.2218);
  }
  to {
    transform: translate(73.2338vw, 100vh) scale(0.2218);
  }
}
.snow:nth-child(101) {
  opacity: 0.1868;
  transform: translate(99.5297vw, -10px) scale(0.2862);
  animation: fall-101 22s -15s linear infinite;
}
@keyframes fall-101 {
  35.081% {
    transform: translate(104.2848vw, 35.081vh) scale(0.2862);
  }
  to {
    transform: translate(101.90725vw, 100vh) scale(0.2862);
  }
}
.snow:nth-child(102) {
  opacity: 0.077;
  transform: translate(55.6812vw, -10px) scale(0.2837);
  animation: fall-102 29s -7s linear infinite;
}
@keyframes fall-102 {
  34.188% {
    transform: translate(62.7345vw, 34.188vh) scale(0.2837);
  }
  to {
    transform: translate(59.20785vw, 100vh) scale(0.2837);
  }
}
.snow:nth-child(103) {
  opacity: 0.7073;
  transform: translate(81.359vw, -10px) scale(0.5005);
  animation: fall-103 22s -17s linear infinite;
}
@keyframes fall-103 {
  53.518% {
    transform: translate(79.7204vw, 53.518vh) scale(0.5005);
  }
  to {
    transform: translate(80.5397vw, 100vh) scale(0.5005);
  }
}
.snow:nth-child(104) {
  opacity: 0.5293;
  transform: translate(67.815vw, -10px) scale(0.7409);
  animation: fall-104 28s -9s linear infinite;
}
@keyframes fall-104 {
  52.056% {
    transform: translate(67.6938vw, 52.056vh) scale(0.7409);
  }
  to {
    transform: translate(67.7544vw, 100vh) scale(0.7409);
  }
}
.snow:nth-child(105) {
  opacity: 0.2661;
  transform: translate(38.7462vw, -10px) scale(0.1054);
  animation: fall-105 26s -23s linear infinite;
}
@keyframes fall-105 {
  78.652% {
    transform: translate(45.022vw, 78.652vh) scale(0.1054);
  }
  to {
    transform: translate(41.8841vw, 100vh) scale(0.1054);
  }
}
.snow:nth-child(106) {
  opacity: 0.8566;
  transform: translate(97.998vw, -10px) scale(0.5535);
  animation: fall-106 11s -11s linear infinite;
}
@keyframes fall-106 {
  32.393% {
    transform: translate(94.6759vw, 32.393vh) scale(0.5535);
  }
  to {
    transform: translate(96.33695vw, 100vh) scale(0.5535);
  }
}
.snow:nth-child(107) {
  opacity: 0.3779;
  transform: translate(75.5385vw, -10px) scale(0.4052);
  animation: fall-107 23s -23s linear infinite;
}
@keyframes fall-107 {
  56.169% {
    transform: translate(81.3397vw, 56.169vh) scale(0.4052);
  }
  to {
    transform: translate(78.4391vw, 100vh) scale(0.4052);
  }
}
.snow:nth-child(108) {
  opacity: 0.8468;
  transform: translate(88.2494vw, -10px) scale(0.2886);
  animation: fall-108 20s -29s linear infinite;
}
@keyframes fall-108 {
  70.564% {
    transform: translate(87.4844vw, 70.564vh) scale(0.2886);
  }
  to {
    transform: translate(87.8669vw, 100vh) scale(0.2886);
  }
}
.snow:nth-child(109) {
  opacity: 0.4458;
  transform: translate(69.2084vw, -10px) scale(0.6008);
  animation: fall-109 15s -13s linear infinite;
}
@keyframes fall-109 {
  73.345% {
    transform: translate(78.1285vw, 73.345vh) scale(0.6008);
  }
  to {
    transform: translate(73.66845vw, 100vh) scale(0.6008);
  }
}
.snow:nth-child(110) {
  opacity: 0.9868;
  transform: translate(60.7548vw, -10px) scale(0.7181);
  animation: fall-110 10s -23s linear infinite;
}
@keyframes fall-110 {
  35.343% {
    transform: translate(55.4495vw, 35.343vh) scale(0.7181);
  }
  to {
    transform: translate(58.10215vw, 100vh) scale(0.7181);
  }
}
.snow:nth-child(111) {
  opacity: 0.865;
  transform: translate(73.6115vw, -10px) scale(0.4101);
  animation: fall-111 26s -26s linear infinite;
}
@keyframes fall-111 {
  37.449% {
    transform: translate(79.2067vw, 37.449vh) scale(0.4101);
  }
  to {
    transform: translate(76.4091vw, 100vh) scale(0.4101);
  }
}
.snow:nth-child(112) {
  opacity: 0.7182;
  transform: translate(4.6467vw, -10px) scale(0.2464);
  animation: fall-112 30s -28s linear infinite;
}
@keyframes fall-112 {
  41.027% {
    transform: translate(11.8625vw, 41.027vh) scale(0.2464);
  }
  to {
    transform: translate(8.2546vw, 100vh) scale(0.2464);
  }
}
.snow:nth-child(113) {
  opacity: 0.7382;
  transform: translate(79.2642vw, -10px) scale(0.069);
  animation: fall-113 21s -19s linear infinite;
}
@keyframes fall-113 {
  49.387% {
    transform: translate(77.1869vw, 49.387vh) scale(0.069);
  }
  to {
    transform: translate(78.22555vw, 100vh) scale(0.069);
  }
}
.snow:nth-child(114) {
  opacity: 0.3777;
  transform: translate(11.837vw, -10px) scale(0.9202);
  animation: fall-114 18s -24s linear infinite;
}
@keyframes fall-114 {
  69.49% {
    transform: translate(6.2922vw, 69.49vh) scale(0.9202);
  }
  to {
    transform: translate(9.0646vw, 100vh) scale(0.9202);
  }
}
.snow:nth-child(115) {
  opacity: 0.1233;
  transform: translate(54.9496vw, -10px) scale(0.1543);
  animation: fall-115 27s -6s linear infinite;
}
@keyframes fall-115 {
  79.234% {
    transform: translate(60.9003vw, 79.234vh) scale(0.1543);
  }
  to {
    transform: translate(57.92495vw, 100vh) scale(0.1543);
  }
}
.snow:nth-child(116) {
  opacity: 0.8252;
  transform: translate(81.2772vw, -10px) scale(0.158);
  animation: fall-116 17s -24s linear infinite;
}
@keyframes fall-116 {
  40.331% {
    transform: translate(90.6192vw, 40.331vh) scale(0.158);
  }
  to {
    transform: translate(85.9482vw, 100vh) scale(0.158);
  }
}
.snow:nth-child(117) {
  opacity: 0.022;
  transform: translate(3.1903vw, -10px) scale(0.8965);
  animation: fall-117 27s -10s linear infinite;
}
@keyframes fall-117 {
  67.031% {
    transform: translate(-5.217vw, 67.031vh) scale(0.8965);
  }
  to {
    transform: translate(-1.01335vw, 100vh) scale(0.8965);
  }
}
.snow:nth-child(118) {
  opacity: 0.5864;
  transform: translate(58.4346vw, -10px) scale(0.7378);
  animation: fall-118 19s -28s linear infinite;
}
@keyframes fall-118 {
  44.331% {
    transform: translate(54.3511vw, 44.331vh) scale(0.7378);
  }
  to {
    transform: translate(56.39285vw, 100vh) scale(0.7378);
  }
}
.snow:nth-child(119) {
  opacity: 0.818;
  transform: translate(57.2127vw, -10px) scale(0.8044);
  animation: fall-119 30s -22s linear infinite;
}
@keyframes fall-119 {
  57.35% {
    transform: translate(67.1314vw, 57.35vh) scale(0.8044);
  }
  to {
    transform: translate(62.17205vw, 100vh) scale(0.8044);
  }
}
.snow:nth-child(120) {
  opacity: 0.6847;
  transform: translate(59.8948vw, -10px) scale(0.4705);
  animation: fall-120 22s -11s linear infinite;
}
@keyframes fall-120 {
  76.791% {
    transform: translate(59.3208vw, 76.791vh) scale(0.4705);
  }
  to {
    transform: translate(59.6078vw, 100vh) scale(0.4705);
  }
}
.snow:nth-child(121) {
  opacity: 0.9827;
  transform: translate(39.9677vw, -10px) scale(0.5111);
  animation: fall-121 21s -26s linear infinite;
}
@keyframes fall-121 {
  58.443% {
    transform: translate(32.6725vw, 58.443vh) scale(0.5111);
  }
  to {
    transform: translate(36.3201vw, 100vh) scale(0.5111);
  }
}
.snow:nth-child(122) {
  opacity: 0.752;
  transform: translate(95.7301vw, -10px) scale(0.9256);
  animation: fall-122 26s -4s linear infinite;
}
@keyframes fall-122 {
  79.288% {
    transform: translate(98.4162vw, 79.288vh) scale(0.9256);
  }
  to {
    transform: translate(97.07315vw, 100vh) scale(0.9256);
  }
}
.snow:nth-child(123) {
  opacity: 0.2563;
  transform: translate(19.345vw, -10px) scale(0.4968);
  animation: fall-123 28s -26s linear infinite;
}
@keyframes fall-123 {
  39.208% {
    transform: translate(23.3206vw, 39.208vh) scale(0.4968);
  }
  to {
    transform: translate(21.3328vw, 100vh) scale(0.4968);
  }
}
.snow:nth-child(124) {
  opacity: 0.0603;
  transform: translate(50.1522vw, -10px) scale(0.2808);
  animation: fall-124 16s -13s linear infinite;
}
@keyframes fall-124 {
  30.492% {
    transform: translate(48.1463vw, 30.492vh) scale(0.2808);
  }
  to {
    transform: translate(49.14925vw, 100vh) scale(0.2808);
  }
}
.snow:nth-child(125) {
  opacity: 0.2262;
  transform: translate(93.5029vw, -10px) scale(0.2331);
  animation: fall-125 14s -11s linear infinite;
}
@keyframes fall-125 {
  37.786% {
    transform: translate(99.3825vw, 37.786vh) scale(0.2331);
  }
  to {
    transform: translate(96.4427vw, 100vh) scale(0.2331);
  }
}
.snow:nth-child(126) {
  opacity: 0.6695;
  transform: translate(91.1886vw, -10px) scale(0.8273);
  animation: fall-126 19s -5s linear infinite;
}
@keyframes fall-126 {
  79.179% {
    transform: translate(99.5297vw, 79.179vh) scale(0.8273);
  }
  to {
    transform: translate(95.35915vw, 100vh) scale(0.8273);
  }
}
.snow:nth-child(127) {
  opacity: 0.8822;
  transform: translate(64.3468vw, -10px) scale(0.4122);
  animation: fall-127 16s -13s linear infinite;
}
@keyframes fall-127 {
  36.31% {
    transform: translate(58.0401vw, 36.31vh) scale(0.4122);
  }
  to {
    transform: translate(61.19345vw, 100vh) scale(0.4122);
  }
}
.snow:nth-child(128) {
  opacity: 0.9767;
  transform: translate(69.4811vw, -10px) scale(0.3891);
  animation: fall-128 24s -18s linear infinite;
}
@keyframes fall-128 {
  52.139% {
    transform: translate(60.2187vw, 52.139vh) scale(0.3891);
  }
  to {
    transform: translate(64.8499vw, 100vh) scale(0.3891);
  }
}
.snow:nth-child(129) {
  opacity: 0.1564;
  transform: translate(81.1567vw, -10px) scale(0.1987);
  animation: fall-129 24s -27s linear infinite;
}
@keyframes fall-129 {
  38.96% {
    transform: translate(73.0199vw, 38.96vh) scale(0.1987);
  }
  to {
    transform: translate(77.0883vw, 100vh) scale(0.1987);
  }
}
.snow:nth-child(130) {
  opacity: 0.0262;
  transform: translate(76.8833vw, -10px) scale(0.2344);
  animation: fall-130 26s -23s linear infinite;
}
@keyframes fall-130 {
  34.833% {
    transform: translate(71.0157vw, 34.833vh) scale(0.2344);
  }
  to {
    transform: translate(73.9495vw, 100vh) scale(0.2344);
  }
}
.snow:nth-child(131) {
  opacity: 0.2629;
  transform: translate(8.2076vw, -10px) scale(0.3459);
  animation: fall-131 17s -21s linear infinite;
}
@keyframes fall-131 {
  39.685% {
    transform: translate(17.4094vw, 39.685vh) scale(0.3459);
  }
  to {
    transform: translate(12.8085vw, 100vh) scale(0.3459);
  }
}
.snow:nth-child(132) {
  opacity: 0.1403;
  transform: translate(46.6609vw, -10px) scale(0.7151);
  animation: fall-132 21s -2s linear infinite;
}
@keyframes fall-132 {
  35.172% {
    transform: translate(48.1884vw, 35.172vh) scale(0.7151);
  }
  to {
    transform: translate(47.42465vw, 100vh) scale(0.7151);
  }
}
.snow:nth-child(133) {
  opacity: 0.0436;
  transform: translate(27.9337vw, -10px) scale(0.9301);
  animation: fall-133 11s -27s linear infinite;
}
@keyframes fall-133 {
  49.186% {
    transform: translate(25.177vw, 49.186vh) scale(0.9301);
  }
  to {
    transform: translate(26.55535vw, 100vh) scale(0.9301);
  }
}
.snow:nth-child(134) {
  opacity: 0.5018;
  transform: translate(12.0845vw, -10px) scale(0.5502);
  animation: fall-134 12s -8s linear infinite;
}
@keyframes fall-134 {
  63.813% {
    transform: translate(10.3015vw, 63.813vh) scale(0.5502);
  }
  to {
    transform: translate(11.193vw, 100vh) scale(0.5502);
  }
}
.snow:nth-child(135) {
  opacity: 0.8523;
  transform: translate(57.8406vw, -10px) scale(0.4966);
  animation: fall-135 21s -7s linear infinite;
}
@keyframes fall-135 {
  41.82% {
    transform: translate(59.7458vw, 41.82vh) scale(0.4966);
  }
  to {
    transform: translate(58.7932vw, 100vh) scale(0.4966);
  }
}
.snow:nth-child(136) {
  opacity: 0.8359;
  transform: translate(99.6107vw, -10px) scale(0.6256);
  animation: fall-136 19s -6s linear infinite;
}
@keyframes fall-136 {
  61.096% {
    transform: translate(100.0622vw, 61.096vh) scale(0.6256);
  }
  to {
    transform: translate(99.83645vw, 100vh) scale(0.6256);
  }
}
.snow:nth-child(137) {
  opacity: 0.6006;
  transform: translate(38.1608vw, -10px) scale(0.077);
  animation: fall-137 18s -15s linear infinite;
}
@keyframes fall-137 {
  75.147% {
    transform: translate(30.3426vw, 75.147vh) scale(0.077);
  }
  to {
    transform: translate(34.2517vw, 100vh) scale(0.077);
  }
}
.snow:nth-child(138) {
  opacity: 0.2485;
  transform: translate(27.8232vw, -10px) scale(0.3999);
  animation: fall-138 12s -26s linear infinite;
}
@keyframes fall-138 {
  45.237% {
    transform: translate(29.8434vw, 45.237vh) scale(0.3999);
  }
  to {
    transform: translate(28.8333vw, 100vh) scale(0.3999);
  }
}
.snow:nth-child(139) {
  opacity: 0.2339;
  transform: translate(52.2125vw, -10px) scale(0.4299);
  animation: fall-139 19s -18s linear infinite;
}
@keyframes fall-139 {
  35.425% {
    transform: translate(50.8777vw, 35.425vh) scale(0.4299);
  }
  to {
    transform: translate(51.5451vw, 100vh) scale(0.4299);
  }
}
.snow:nth-child(140) {
  opacity: 0.5523;
  transform: translate(8.6773vw, -10px) scale(0.845);
  animation: fall-140 24s -13s linear infinite;
}
@keyframes fall-140 {
  64.625% {
    transform: translate(13.3253vw, 64.625vh) scale(0.845);
  }
  to {
    transform: translate(11.0013vw, 100vh) scale(0.845);
  }
}
.snow:nth-child(141) {
  opacity: 0.9374;
  transform: translate(42.4788vw, -10px) scale(0.6107);
  animation: fall-141 14s -20s linear infinite;
}
@keyframes fall-141 {
  36.325% {
    transform: translate(44.1581vw, 36.325vh) scale(0.6107);
  }
  to {
    transform: translate(43.31845vw, 100vh) scale(0.6107);
  }
}
.snow:nth-child(142) {
  opacity: 0.6876;
  transform: translate(24.9172vw, -10px) scale(0.4081);
  animation: fall-142 23s -14s linear infinite;
}
@keyframes fall-142 {
  62.937% {
    transform: translate(34.6134vw, 62.937vh) scale(0.4081);
  }
  to {
    transform: translate(29.7653vw, 100vh) scale(0.4081);
  }
}
.snow:nth-child(143) {
  opacity: 0.2829;
  transform: translate(81.7671vw, -10px) scale(0.0638);
  animation: fall-143 22s -8s linear infinite;
}
@keyframes fall-143 {
  34.844% {
    transform: translate(73.9025vw, 34.844vh) scale(0.0638);
  }
  to {
    transform: translate(77.8348vw, 100vh) scale(0.0638);
  }
}
.snow:nth-child(144) {
  opacity: 0.8504;
  transform: translate(10.114vw, -10px) scale(0.1097);
  animation: fall-144 21s -30s linear infinite;
}
@keyframes fall-144 {
  59.355% {
    transform: translate(13.6403vw, 59.355vh) scale(0.1097);
  }
  to {
    transform: translate(11.87715vw, 100vh) scale(0.1097);
  }
}
.snow:nth-child(145) {
  opacity: 0.8443;
  transform: translate(26.4772vw, -10px) scale(0.6017);
  animation: fall-145 11s -23s linear infinite;
}
@keyframes fall-145 {
  75.975% {
    transform: translate(29.8442vw, 75.975vh) scale(0.6017);
  }
  to {
    transform: translate(28.1607vw, 100vh) scale(0.6017);
  }
}
.snow:nth-child(146) {
  opacity: 0.9976;
  transform: translate(99.8758vw, -10px) scale(0.815);
  animation: fall-146 15s -11s linear infinite;
}
@keyframes fall-146 {
  62.986% {
    transform: translate(108.4534vw, 62.986vh) scale(0.815);
  }
  to {
    transform: translate(104.1646vw, 100vh) scale(0.815);
  }
}
.snow:nth-child(147) {
  opacity: 0.4706;
  transform: translate(95.2599vw, -10px) scale(0.6823);
  animation: fall-147 25s -20s linear infinite;
}
@keyframes fall-147 {
  73.732% {
    transform: translate(92.9197vw, 73.732vh) scale(0.6823);
  }
  to {
    transform: translate(94.0898vw, 100vh) scale(0.6823);
  }
}
.snow:nth-child(148) {
  opacity: 0.3323;
  transform: translate(54.6135vw, -10px) scale(0.5636);
  animation: fall-148 14s -1s linear infinite;
}
@keyframes fall-148 {
  35.086% {
    transform: translate(59.3709vw, 35.086vh) scale(0.5636);
  }
  to {
    transform: translate(56.9922vw, 100vh) scale(0.5636);
  }
}
.snow:nth-child(149) {
  opacity: 0.7927;
  transform: translate(40.8399vw, -10px) scale(0.5107);
  animation: fall-149 20s -15s linear infinite;
}
@keyframes fall-149 {
  31.976% {
    transform: translate(36.0274vw, 31.976vh) scale(0.5107);
  }
  to {
    transform: translate(38.43365vw, 100vh) scale(0.5107);
  }
}
.snow:nth-child(150) {
  opacity: 0.8984;
  transform: translate(58.2987vw, -10px) scale(0.235);
  animation: fall-150 17s -10s linear infinite;
}
@keyframes fall-150 {
  63.276% {
    transform: translate(59.6037vw, 63.276vh) scale(0.235);
  }
  to {
    transform: translate(58.9512vw, 100vh) scale(0.235);
  }
}
.snow:nth-child(151) {
  opacity: 0.3068;
  transform: translate(86.2974vw, -10px) scale(0.9532);
  animation: fall-151 27s -16s linear infinite;
}
@keyframes fall-151 {
  41.869% {
    transform: translate(89.5581vw, 41.869vh) scale(0.9532);
  }
  to {
    transform: translate(87.92775vw, 100vh) scale(0.9532);
  }
}
.snow:nth-child(152) {
  opacity: 0.1637;
  transform: translate(3.4823vw, -10px) scale(0.2676);
  animation: fall-152 17s -6s linear infinite;
}
@keyframes fall-152 {
  67.749% {
    transform: translate(-1.3639vw, 67.749vh) scale(0.2676);
  }
  to {
    transform: translate(1.0592vw, 100vh) scale(0.2676);
  }
}
.snow:nth-child(153) {
  opacity: 0.7966;
  transform: translate(90.83vw, -10px) scale(0.2719);
  animation: fall-153 11s -3s linear infinite;
}
@keyframes fall-153 {
  68.702% {
    transform: translate(94.948vw, 68.702vh) scale(0.2719);
  }
  to {
    transform: translate(92.889vw, 100vh) scale(0.2719);
  }
}
.snow:nth-child(154) {
  opacity: 0.6803;
  transform: translate(33.293vw, -10px) scale(0.1324);
  animation: fall-154 15s -13s linear infinite;
}
@keyframes fall-154 {
  71.277% {
    transform: translate(28.5059vw, 71.277vh) scale(0.1324);
  }
  to {
    transform: translate(30.89945vw, 100vh) scale(0.1324);
  }
}
.snow:nth-child(155) {
  opacity: 0.5099;
  transform: translate(32.06vw, -10px) scale(0.5174);
  animation: fall-155 16s -15s linear infinite;
}
@keyframes fall-155 {
  74.723% {
    transform: translate(30.7963vw, 74.723vh) scale(0.5174);
  }
  to {
    transform: translate(31.42815vw, 100vh) scale(0.5174);
  }
}
.snow:nth-child(156) {
  opacity: 0.6437;
  transform: translate(76.3338vw, -10px) scale(0.873);
  animation: fall-156 28s -11s linear infinite;
}
@keyframes fall-156 {
  49.272% {
    transform: translate(69.5322vw, 49.272vh) scale(0.873);
  }
  to {
    transform: translate(72.933vw, 100vh) scale(0.873);
  }
}
.snow:nth-child(157) {
  opacity: 0.2004;
  transform: translate(62.3629vw, -10px) scale(0.727);
  animation: fall-157 19s -14s linear infinite;
}
@keyframes fall-157 {
  30.083% {
    transform: translate(69.4139vw, 30.083vh) scale(0.727);
  }
  to {
    transform: translate(65.8884vw, 100vh) scale(0.727);
  }
}
.snow:nth-child(158) {
  opacity: 0.8313;
  transform: translate(62.7944vw, -10px) scale(0.6751);
  animation: fall-158 25s -11s linear infinite;
}
@keyframes fall-158 {
  65.743% {
    transform: translate(71.3039vw, 65.743vh) scale(0.6751);
  }
  to {
    transform: translate(67.04915vw, 100vh) scale(0.6751);
  }
}
.snow:nth-child(159) {
  opacity: 0.1478;
  transform: translate(60.2802vw, -10px) scale(0.1722);
  animation: fall-159 26s -7s linear infinite;
}
@keyframes fall-159 {
  55.891% {
    transform: translate(65.217vw, 55.891vh) scale(0.1722);
  }
  to {
    transform: translate(62.7486vw, 100vh) scale(0.1722);
  }
}
.snow:nth-child(160) {
  opacity: 0.4822;
  transform: translate(55.1116vw, -10px) scale(0.0467);
  animation: fall-160 15s -3s linear infinite;
}
@keyframes fall-160 {
  78.084% {
    transform: translate(62.9546vw, 78.084vh) scale(0.0467);
  }
  to {
    transform: translate(59.0331vw, 100vh) scale(0.0467);
  }
}
.snow:nth-child(161) {
  opacity: 0.3356;
  transform: translate(84.9096vw, -10px) scale(0.7682);
  animation: fall-161 29s -24s linear infinite;
}
@keyframes fall-161 {
  67.819% {
    transform: translate(92.3083vw, 67.819vh) scale(0.7682);
  }
  to {
    transform: translate(88.60895vw, 100vh) scale(0.7682);
  }
}
.snow:nth-child(162) {
  opacity: 0.3837;
  transform: translate(72.3715vw, -10px) scale(0.2345);
  animation: fall-162 29s -1s linear infinite;
}
@keyframes fall-162 {
  71.946% {
    transform: translate(77.5809vw, 71.946vh) scale(0.2345);
  }
  to {
    transform: translate(74.9762vw, 100vh) scale(0.2345);
  }
}
.snow:nth-child(163) {
  opacity: 0.7455;
  transform: translate(94.7214vw, -10px) scale(0.3339);
  animation: fall-163 26s -13s linear infinite;
}
@keyframes fall-163 {
  35.582% {
    transform: translate(89.3887vw, 35.582vh) scale(0.3339);
  }
  to {
    transform: translate(92.05505vw, 100vh) scale(0.3339);
  }
}
.snow:nth-child(164) {
  opacity: 0.207;
  transform: translate(39.572vw, -10px) scale(0.97);
  animation: fall-164 12s -27s linear infinite;
}
@keyframes fall-164 {
  36.569% {
    transform: translate(39.3596vw, 36.569vh) scale(0.97);
  }
  to {
    transform: translate(39.4658vw, 100vh) scale(0.97);
  }
}
.snow:nth-child(165) {
  opacity: 0.3489;
  transform: translate(45.5885vw, -10px) scale(0.593);
  animation: fall-165 17s -11s linear infinite;
}
@keyframes fall-165 {
  56.675% {
    transform: translate(37.7589vw, 56.675vh) scale(0.593);
  }
  to {
    transform: translate(41.6737vw, 100vh) scale(0.593);
  }
}
.snow:nth-child(166) {
  opacity: 0.7591;
  transform: translate(90.3634vw, -10px) scale(0.2474);
  animation: fall-166 25s -3s linear infinite;
}
@keyframes fall-166 {
  66.242% {
    transform: translate(81.3024vw, 66.242vh) scale(0.2474);
  }
  to {
    transform: translate(85.8329vw, 100vh) scale(0.2474);
  }
}
.snow:nth-child(167) {
  opacity: 0.553;
  transform: translate(95.1046vw, -10px) scale(0.3729);
  animation: fall-167 30s -3s linear infinite;
}
@keyframes fall-167 {
  78.567% {
    transform: translate(92.9995vw, 78.567vh) scale(0.3729);
  }
  to {
    transform: translate(94.05205vw, 100vh) scale(0.3729);
  }
}
.snow:nth-child(168) {
  opacity: 0.1228;
  transform: translate(33.739vw, -10px) scale(0.6956);
  animation: fall-168 18s -3s linear infinite;
}
@keyframes fall-168 {
  57.469% {
    transform: translate(42.1267vw, 57.469vh) scale(0.6956);
  }
  to {
    transform: translate(37.93285vw, 100vh) scale(0.6956);
  }
}
.snow:nth-child(169) {
  opacity: 0.8226;
  transform: translate(36.5834vw, -10px) scale(0.253);
  animation: fall-169 26s -28s linear infinite;
}
@keyframes fall-169 {
  44.497% {
    transform: translate(26.9877vw, 44.497vh) scale(0.253);
  }
  to {
    transform: translate(31.78555vw, 100vh) scale(0.253);
  }
}
.snow:nth-child(170) {
  opacity: 0.3309;
  transform: translate(39.6419vw, -10px) scale(0.3635);
  animation: fall-170 17s -17s linear infinite;
}
@keyframes fall-170 {
  73.692% {
    transform: translate(30.6261vw, 73.692vh) scale(0.3635);
  }
  to {
    transform: translate(35.134vw, 100vh) scale(0.3635);
  }
}
.snow:nth-child(171) {
  opacity: 0.0082;
  transform: translate(43.0284vw, -10px) scale(0.9954);
  animation: fall-171 15s -18s linear infinite;
}
@keyframes fall-171 {
  68.711% {
    transform: translate(46.4088vw, 68.711vh) scale(0.9954);
  }
  to {
    transform: translate(44.7186vw, 100vh) scale(0.9954);
  }
}
.snow:nth-child(172) {
  opacity: 0.4592;
  transform: translate(57.4136vw, -10px) scale(0.4836);
  animation: fall-172 23s -16s linear infinite;
}
@keyframes fall-172 {
  37.425% {
    transform: translate(63.7649vw, 37.425vh) scale(0.4836);
  }
  to {
    transform: translate(60.58925vw, 100vh) scale(0.4836);
  }
}
.snow:nth-child(173) {
  opacity: 0.9303;
  transform: translate(32.5825vw, -10px) scale(0.0499);
  animation: fall-173 27s -10s linear infinite;
}
@keyframes fall-173 {
  40.889% {
    transform: translate(42.1253vw, 40.889vh) scale(0.0499);
  }
  to {
    transform: translate(37.3539vw, 100vh) scale(0.0499);
  }
}
.snow:nth-child(174) {
  opacity: 0.9127;
  transform: translate(14.858vw, -10px) scale(0.9933);
  animation: fall-174 12s -20s linear infinite;
}
@keyframes fall-174 {
  71.27% {
    transform: translate(23.8219vw, 71.27vh) scale(0.9933);
  }
  to {
    transform: translate(19.33995vw, 100vh) scale(0.9933);
  }
}
.snow:nth-child(175) {
  opacity: 0.5514;
  transform: translate(40.1036vw, -10px) scale(0.7848);
  animation: fall-175 19s -9s linear infinite;
}
@keyframes fall-175 {
  52.342% {
    transform: translate(33.363vw, 52.342vh) scale(0.7848);
  }
  to {
    transform: translate(36.7333vw, 100vh) scale(0.7848);
  }
}
.snow:nth-child(176) {
  opacity: 0.2011;
  transform: translate(57.504vw, -10px) scale(0.024);
  animation: fall-176 26s -28s linear infinite;
}
@keyframes fall-176 {
  41.237% {
    transform: translate(59.258vw, 41.237vh) scale(0.024);
  }
  to {
    transform: translate(58.381vw, 100vh) scale(0.024);
  }
}
.snow:nth-child(177) {
  opacity: 0.1806;
  transform: translate(54.1872vw, -10px) scale(0.1864);
  animation: fall-177 19s -14s linear infinite;
}
@keyframes fall-177 {
  59.777% {
    transform: translate(62.9676vw, 59.777vh) scale(0.1864);
  }
  to {
    transform: translate(58.5774vw, 100vh) scale(0.1864);
  }
}
.snow:nth-child(178) {
  opacity: 0.0953;
  transform: translate(85.2291vw, -10px) scale(0.5189);
  animation: fall-178 30s -3s linear infinite;
}
@keyframes fall-178 {
  53.915% {
    transform: translate(90.6771vw, 53.915vh) scale(0.5189);
  }
  to {
    transform: translate(87.9531vw, 100vh) scale(0.5189);
  }
}
.snow:nth-child(179) {
  opacity: 0.2732;
  transform: translate(71.731vw, -10px) scale(0.4394);
  animation: fall-179 18s -28s linear infinite;
}
@keyframes fall-179 {
  65.558% {
    transform: translate(77.274vw, 65.558vh) scale(0.4394);
  }
  to {
    transform: translate(74.5025vw, 100vh) scale(0.4394);
  }
}
.snow:nth-child(180) {
  opacity: 0.3698;
  transform: translate(24.4494vw, -10px) scale(0.1813);
  animation: fall-180 23s -6s linear infinite;
}
@keyframes fall-180 {
  63.028% {
    transform: translate(14.645vw, 63.028vh) scale(0.1813);
  }
  to {
    transform: translate(19.5472vw, 100vh) scale(0.1813);
  }
}
.snow:nth-child(181) {
  opacity: 0.9842;
  transform: translate(24.2501vw, -10px) scale(0.323);
  animation: fall-181 20s -17s linear infinite;
}
@keyframes fall-181 {
  49.502% {
    transform: translate(20.1278vw, 49.502vh) scale(0.323);
  }
  to {
    transform: translate(22.18895vw, 100vh) scale(0.323);
  }
}
.snow:nth-child(182) {
  opacity: 0.0853;
  transform: translate(20.7419vw, -10px) scale(0.3276);
  animation: fall-182 17s -9s linear infinite;
}
@keyframes fall-182 {
  37.242% {
    transform: translate(25.6825vw, 37.242vh) scale(0.3276);
  }
  to {
    transform: translate(23.2122vw, 100vh) scale(0.3276);
  }
}
.snow:nth-child(183) {
  opacity: 0.0771;
  transform: translate(47.6078vw, -10px) scale(0.805);
  animation: fall-183 16s -17s linear infinite;
}
@keyframes fall-183 {
  64.467% {
    transform: translate(51.0527vw, 64.467vh) scale(0.805);
  }
  to {
    transform: translate(49.33025vw, 100vh) scale(0.805);
  }
}
.snow:nth-child(184) {
  opacity: 0.4259;
  transform: translate(78.4468vw, -10px) scale(0.1342);
  animation: fall-184 21s -1s linear infinite;
}
@keyframes fall-184 {
  33.5% {
    transform: translate(80.6246vw, 33.5vh) scale(0.1342);
  }
  to {
    transform: translate(79.5357vw, 100vh) scale(0.1342);
  }
}
.snow:nth-child(185) {
  opacity: 0.4019;
  transform: translate(51.3762vw, -10px) scale(0.2414);
  animation: fall-185 24s -12s linear infinite;
}
@keyframes fall-185 {
  39.353% {
    transform: translate(53.2012vw, 39.353vh) scale(0.2414);
  }
  to {
    transform: translate(52.2887vw, 100vh) scale(0.2414);
  }
}
.snow:nth-child(186) {
  opacity: 0.9011;
  transform: translate(9.8995vw, -10px) scale(0.961);
  animation: fall-186 24s -26s linear infinite;
}
@keyframes fall-186 {
  65.24% {
    transform: translate(16.2241vw, 65.24vh) scale(0.961);
  }
  to {
    transform: translate(13.0618vw, 100vh) scale(0.961);
  }
}
.snow:nth-child(187) {
  opacity: 0.0827;
  transform: translate(52.4195vw, -10px) scale(0.986);
  animation: fall-187 15s -11s linear infinite;
}
@keyframes fall-187 {
  44.876% {
    transform: translate(59.6031vw, 44.876vh) scale(0.986);
  }
  to {
    transform: translate(56.0113vw, 100vh) scale(0.986);
  }
}
.snow:nth-child(188) {
  opacity: 0.1007;
  transform: translate(65.0041vw, -10px) scale(0.5696);
  animation: fall-188 13s -20s linear infinite;
}
@keyframes fall-188 {
  36.415% {
    transform: translate(55.1826vw, 36.415vh) scale(0.5696);
  }
  to {
    transform: translate(60.09335vw, 100vh) scale(0.5696);
  }
}
.snow:nth-child(189) {
  opacity: 0.3347;
  transform: translate(27.2893vw, -10px) scale(0.6301);
  animation: fall-189 12s -8s linear infinite;
}
@keyframes fall-189 {
  46.482% {
    transform: translate(33.5965vw, 46.482vh) scale(0.6301);
  }
  to {
    transform: translate(30.4429vw, 100vh) scale(0.6301);
  }
}
.snow:nth-child(190) {
  opacity: 0.7303;
  transform: translate(3.4217vw, -10px) scale(0.4031);
  animation: fall-190 29s -16s linear infinite;
}
@keyframes fall-190 {
  73.758% {
    transform: translate(9.8857vw, 73.758vh) scale(0.4031);
  }
  to {
    transform: translate(6.6537vw, 100vh) scale(0.4031);
  }
}
.snow:nth-child(191) {
  opacity: 0.0137;
  transform: translate(54.3081vw, -10px) scale(0.7119);
  animation: fall-191 10s -10s linear infinite;
}
@keyframes fall-191 {
  42.922% {
    transform: translate(51.0735vw, 42.922vh) scale(0.7119);
  }
  to {
    transform: translate(52.6908vw, 100vh) scale(0.7119);
  }
}
.snow:nth-child(192) {
  opacity: 0.5308;
  transform: translate(61.5004vw, -10px) scale(0.5222);
  animation: fall-192 26s -7s linear infinite;
}
@keyframes fall-192 {
  43.883% {
    transform: translate(63.6356vw, 43.883vh) scale(0.5222);
  }
  to {
    transform: translate(62.568vw, 100vh) scale(0.5222);
  }
}
.snow:nth-child(193) {
  opacity: 0.9784;
  transform: translate(15.7045vw, -10px) scale(0.1092);
  animation: fall-193 28s -28s linear infinite;
}
@keyframes fall-193 {
  64.942% {
    transform: translate(15.1884vw, 64.942vh) scale(0.1092);
  }
  to {
    transform: translate(15.44645vw, 100vh) scale(0.1092);
  }
}
.snow:nth-child(194) {
  opacity: 0.7926;
  transform: translate(32.6303vw, -10px) scale(0.2847);
  animation: fall-194 25s -4s linear infinite;
}
@keyframes fall-194 {
  30.839% {
    transform: translate(27.5135vw, 30.839vh) scale(0.2847);
  }
  to {
    transform: translate(30.0719vw, 100vh) scale(0.2847);
  }
}
.snow:nth-child(195) {
  opacity: 0.8889;
  transform: translate(56.713vw, -10px) scale(0.318);
  animation: fall-195 18s -24s linear infinite;
}
@keyframes fall-195 {
  50.631% {
    transform: translate(60.3768vw, 50.631vh) scale(0.318);
  }
  to {
    transform: translate(58.5449vw, 100vh) scale(0.318);
  }
}
.snow:nth-child(196) {
  opacity: 0.1196;
  transform: translate(15.7055vw, -10px) scale(0.3153);
  animation: fall-196 29s -17s linear infinite;
}
@keyframes fall-196 {
  74.656% {
    transform: translate(8.5823vw, 74.656vh) scale(0.3153);
  }
  to {
    transform: translate(12.1439vw, 100vh) scale(0.3153);
  }
}
.snow:nth-child(197) {
  opacity: 0.6848;
  transform: translate(21.2447vw, -10px) scale(0.0513);
  animation: fall-197 15s -18s linear infinite;
}
@keyframes fall-197 {
  67.867% {
    transform: translate(22.5471vw, 67.867vh) scale(0.0513);
  }
  to {
    transform: translate(21.8959vw, 100vh) scale(0.0513);
  }
}
.snow:nth-child(198) {
  opacity: 0.1089;
  transform: translate(90.7947vw, -10px) scale(0.7605);
  animation: fall-198 10s -28s linear infinite;
}
@keyframes fall-198 {
  76.154% {
    transform: translate(91.9435vw, 76.154vh) scale(0.7605);
  }
  to {
    transform: translate(91.3691vw, 100vh) scale(0.7605);
  }
}
.snow:nth-child(199) {
  opacity: 0.957;
  transform: translate(97.2515vw, -10px) scale(0.9036);
  animation: fall-199 22s -12s linear infinite;
}
@keyframes fall-199 {
  72.816% {
    transform: translate(91.8672vw, 72.816vh) scale(0.9036);
  }
  to {
    transform: translate(94.55935vw, 100vh) scale(0.9036);
  }
}
.snow:nth-child(200) {
  opacity: 0.3207;
  transform: translate(80.7932vw, -10px) scale(0.127);
  animation: fall-200 23s -1s linear infinite;
}
@keyframes fall-200 {
  41.377% {
    transform: translate(72.0569vw, 41.377vh) scale(0.127);
  }
  to {
    transform: translate(76.42505vw, 100vh) scale(0.127);
  }
}
</style>
{#if !data.project.wikiEnabled}
<div class="w-full h-full relative overflow-hidden" style="background:url(/uwu.png);background-size:cover;background-position:center;">
    <div class="bg-surface-900/90 w-full h-full">
    <div class="absolute top-0 left-0 w-full h-full opacity-100">
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
        <div class="snow"></div>
    </div>

    <div class="flex w-full h-full items-center justify-center flex-col gap-4 bg-gradient-to-tr from-primary-900/0 to-primary-900/50 relative">
        <div class="card p-4 flex-col variant-glass-surface relative z-10">
            <div class="h-96 text-center">
                <h1 class="h2 font-bold">Wiki is disabled</h1>
                <p class="opacity-50">NOTE: Enable only works if you are the project owner</p>    
            </div>
            <div class="flex gap-4">
                <button class="btn variant-filled" on:click={()=>{
        
                }}>
                    Enable
                </button>
                <button class="anchor !text-white" on:click={()=>{
                    location.pathname = '/'
                }}>
                    Go Back
                </button>
            </div>
        
        </div>
    </div>
</div>
</div>
{/if}
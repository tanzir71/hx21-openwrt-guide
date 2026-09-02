# Windows কিট — আগে পড়ুন

এটি একই HX21 ফার্মওয়্যারের Windows প্রস্তুতি কিট; Mac-এর `.command` বা `.sh` ফাইল এখানে নেই। পূর্ণ বাংলা নির্দেশনা ও OS বেছে নেওয়ার সুবিধা: https://hx21-openwrt-guide.vercel.app/bn/windows/steps

- OpenSSH Client, PowerShell 7.4+ (`pwsh`) ও অফিশিয়াল Tftpd64 আলাদা করে নিন। Windows Terminal মানেই PowerShell 7 নয়।
- `START-HERE.md` ও স্ক্রিপ্ট নিজে পড়ুন। বাইনারি ব্যাকআপে পুরনো Windows PowerShell, `Out-File` বা `2>&1` ব্যবহার করবেন না।
- `Verify-Files.ps1` ফাইলের SHA-256 মেলায়; প্রকাশকের স্বাক্ষর যাচাই করে না।
- `Backup-Stock.ps1` শুধু স্টক থেকে পড়ে: রাউটারে কিছু লেখে না, IP/firewall বদলায় না। ভুল map, read error, মাপ বা hash অমিল হলে থামে। নতুন ব্যক্তিগত destination দিন এবং দ্বিতীয় কপি রাখুন।
- চলমান UBI/পুরো flash বদলাতে পারে; অমিলকে পাশ কাটাবেন না। `.part` ফাইল যাচাইকৃত ব্যাকআপ নয়। Raw dump আলাদা OOB/bad-block metadata ধরে না।
- ঐচ্ছিক SSH কনফিগে MAC/Factory ডেটা বদলানোর কমিউনিটি রিপোর্ট আছে। পরে নেওয়া ব্যাকআপ আগের ডেটা অক্ষত ছিল কি না প্রমাণ করে না।
- আসল Windows PC বা HX21-এ এই হেল্পার পরীক্ষা করা হয়নি। লেখা/ফ্ল্যাশের আগে বর্তমান অফিশিয়াল নির্দেশনা ও রিকভারির প্রস্তুতি নিশ্চিত করুন।

সংকলন: তানজির রহমান — https://tanziro.com/

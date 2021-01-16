# Open MR step
### Concept
```
Squash commit => Rebase => open MR => Code Review => Merge
 ```

### Step detail
1. **Squash commit:** รวมหลาย ``commit`` ใน branch ก่อน ``rebase`` เวลามี ``conflict`` จะได้แก้แค่ครั้งเดียว
**command:** ``git rebase -i <COMMIT_HASH>``
**hint:** 
	- เลือก ``pick`` commit แรกเอาไว้ ที่เหลือเลือก ``squash``
	- ``commit hash`` หาจากในเว็บ github ได้ ใช้ hash commit จุดที่เราแยกออกจาก branch ก่อนหน้า หรือ develop

2. **Rebase:** ทำให้ bracnh ของเราอัพเดทกับ parent barnch
**command:** ``git rebase <BRANCH_NAME>`` หรือ ``git rebase origin/<BRANCH_NAME>``
**hint:** แก้ ``conflict`` โดยเลือกดูแต่ละอัน

3. **Open MR:** เปิดให้เพื่อน review code
4. **Merge:** รวม branch  เข้า parent branch

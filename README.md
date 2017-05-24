# CaseKeep Replace 

With this package you can replace given string with another, but preserve its original case.

Default keyboard shortcut: `ctrl`+`cmd`+`r`

**Example**

With this code:

```javascript
function testCase() {
  const TESTCASE = 'TestCase'
  
  return TESTCASE
}
```

If you replace **testCase** to **newCase** you will get:

```javascript
function newCase() {
  const NEWCASE = 'NewCase'
  
  return NEWCASE
}
```
    
The case-keep-replace package will do four replacements:

1. Replace var-like strings: **testCase** -> **newCase**
1. Replace class-like strings: **TestCase** -> **NewCase**
1. Replace const-like strings: **TESTCASE** -> **NEWCASE**
1. Replace underscored-const-like strings: **TEST_CASE** -> **NEW_CASE**

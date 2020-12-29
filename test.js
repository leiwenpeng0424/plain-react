class A {
    constructor() {
        this.names = ['a', 'b', 'c'];
    }
    // 内部只能使用静态成员变量以及调用静态方法, 不能使用 this 关键字
    // 节省空间, 但是无法控制销毁.
    static getName() {
        console.log('-->',this);
    }
}

class B extends A {

}

const b = new B();

A.getName();

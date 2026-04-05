// ===== QUESTIONS =====
// ===== QUESTIONS =====
const QUESTIONS = [
  {
    q: "Which keyword is used to define a constant variable in Java?",
    opts: ["static", "final", "const", "immutable"],
    ans: 1,
    explain: "'final' makes a variable constant and prevents reassignment after initialization."
  },
  {
    q: "What is the default value of an 'int' field declared at class level in Java?",
    opts: ["null", "undefined", "0", "-1"],
    ans: 2,
    explain: "Instance int fields automatically default to 0 in Java if not explicitly initialized."
  },
  {
    q: "Which of the following is NOT a valid Java access modifier?",
    opts: ["public", "protected", "private", "friend"],
    ans: 3,
    explain: "'friend' is a C++ concept. Java's access modifiers are: public, protected, private, and default."
  },
  {
    q: "What does JVM stand for in Java?",
    opts: ["Java Virtual Machine", "Java Variable Method", "Java Version Manager", "Java Verified Module"],
    ans: 0,
    explain: "JVM stands for Java Virtual Machine — it executes compiled Java bytecode."
  },
  {
    q: "Which data structure does Java's HashMap use internally for storing entries?",
    opts: ["Linked List only", "Binary Search Tree", "Array of buckets (LinkedList/Tree)", "Stack"],
    ans: 2,
    explain: "HashMap uses an array of buckets; each bucket is a linked list (or balanced tree in Java 8+)."
  },
  {
    q: "What will System.out.println(10 / 3) print in Java?",
    opts: ["3.33", "3", "3.0", "Compilation Error"],
    ans: 1,
    explain: "Integer division in Java truncates the decimal part — 10 / 3 = 3."
  },
  {
    q: "Which interface must a class implement to enable sorting via Collections.sort()?",
    opts: ["Serializable", "Comparable", "Cloneable", "Iterable"],
    ans: 1,
    explain: "The Comparable interface (compareTo() method) enables natural ordering for Collections.sort()."
  },
  {
    q: "What is the root/parent class of all classes in Java?",
    opts: ["Class", "Base", "Object", "Root"],
    ans: 2,
    explain: "java.lang.Object is the root class of the entire Java class hierarchy."
  },
  {
    q: "Which exception is thrown when you access an array element beyond its length?",
    opts: ["NullPointerException", "IllegalArgumentException", "ArrayIndexOutOfBoundsException", "ClassCastException"],
    ans: 2,
    explain: "ArrayIndexOutOfBoundsException is thrown when index < 0 or index >= array.length."
  },
  {
    q: "Which keyword is used in Java to call a superclass constructor?",
    opts: ["this()", "parent()", "super()", "base()"],
    ans: 2,
    explain: "super() calls the parent class constructor; it must be the very first statement in the constructor."
  }
];

const QUESTIONS_MULTITHREADING = [
  {
    q: "Which method is used to start a new thread in Java?",
    opts: ["run()", "start()", "init()", "execute()"],
    ans: 1,
    explain: "start() creates a new thread and calls run() internally. Calling run() directly does NOT create a new thread."
  },
  {
    q: "Which keyword makes a variable visible across all threads immediately?",
    opts: ["synchronized", "static", "volatile", "transient"],
    ans: 2,
    explain: "volatile ensures every read/write goes to main memory, making changes instantly visible to all threads."
  },
  {
    q: "What does the synchronized keyword prevent?",
    opts: ["Thread creation", "Race conditions by allowing only one thread at a time", "Deadlocks", "Thread sleeping"],
    ans: 1,
    explain: "synchronized ensures only one thread executes a block/method at a time, preventing race conditions."
  },
  {
    q: "Which method causes the current thread to pause and release the lock?",
    opts: ["sleep()", "wait()", "yield()", "pause()"],
    ans: 1,
    explain: "wait() releases the lock and suspends the thread until notify() or notifyAll() is called."
  },
  {
    q: "What is a deadlock in Java multithreading?",
    opts: ["A thread running forever", "Two threads waiting for each other's locks forever", "A thread that crashes", "Too many threads running"],
    ans: 1,
    explain: "Deadlock occurs when two or more threads are blocked forever, each waiting for a lock the other holds."
  },
  {
    q: "Which class from java.util.concurrent manages a pool of reusable threads?",
    opts: ["ThreadGroup", "ThreadLocal", "ExecutorService", "ForkJoinPool"],
    ans: 2,
    explain: "ExecutorService (via Executors factory) manages thread pools, reusing threads for submitted tasks."
  },
  {
    q: "What does Thread.sleep(1000) do?",
    opts: ["Stops thread permanently", "Pauses thread for 1000 milliseconds without releasing lock", "Releases lock and waits", "Kills the thread"],
    ans: 1,
    explain: "sleep() pauses the thread for the specified time but does NOT release any locks it holds."
  },
  {
    q: "Which interface should you implement when a thread needs to return a result?",
    opts: ["Runnable", "Thread", "Callable", "Executor"],
    ans: 2,
    explain: "Callable<V> is like Runnable but its call() method returns a value and can throw checked exceptions."
  },
  {
    q: "What is the purpose of notify() method in Java?",
    opts: ["Start a new thread", "Stop a thread", "Wake up one thread waiting on the object's monitor", "Synchronize a block"],
    ans: 2,
    explain: "notify() wakes up a single thread that called wait() on the same object. notifyAll() wakes all waiting threads."
  },
  {
    q: "Which state is a thread in after calling start() but before the scheduler picks it up?",
    opts: ["RUNNING", "BLOCKED", "RUNNABLE", "WAITING"],
    ans: 2,
    explain: "After start(), the thread enters RUNNABLE state — it's ready to run but waiting for the CPU scheduler."
  }
];

const LABELS = ['A','B','C','D'];
const TIME = 20;
const CIRCUMFERENCE = 170; // 2π×27 ≈ 170
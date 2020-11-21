import { assert } from "chai"
import { readFileSync } from "fs"
import { performance } from "perf_hooks"
import Graph, { Arc, Node } from "../src/dataStructures/graph"
import Queue from "../src/dataStructures/queue"

describe("Data structures", () => {
    describe("Queue", () => {
        const queue = new Queue()

        it("Initial queue should be empty", () => {
            assert.equal(queue.size(), 0)
        })

        it("Should enqueue and dequeue a value", () => {
            queue.enqueue(1)

            assert.equal(queue.size(), 1)
            assert.equal(queue.dequeue(), 1)
            assert.equal(queue.size(), 0)
        })

        it("Should peek a value", () => {
            queue.enqueue(1)

            const value = queue.peek()

            assert.equal(value, 1)
            assert.equal(queue.size(), 1)
        })

        it("Should be faster than an array (with O(n) shift method)", () => {
            const iterations = 100000
            const t0 = performance.now()

            const customQueue = new Queue()
            for (let i = 0; i < iterations; i++) {
                customQueue.enqueue(i)
                if (i % 10 === 0) customQueue.dequeue()
            }

            const t1 = performance.now()

            const arrayQueue = []
            for (let i = 0; i < iterations; i++) {
                arrayQueue.push(i)
                if (i % 10 === 0) arrayQueue.shift()
            }

            const t2 = performance.now()

            assert.isAtMost((t1 - t0) * 10, t2 - t1)
        })
    })

    describe("Graph", () => {
        it("Should create a graph with a node", () => {
            const graph = new Graph()
            const arc = new Arc(2, 2, 4, 5)
            const node = new Node(1, 2, [arc])

            graph.addNode(node)

            assert.deepEqual(graph.getNode(1), node)
        })

        it("Should create a graph using external graph data", () => {
            const graphData = JSON.parse(readFileSync("./data/simpleGraph.json", "utf8"))
            const graph = new Graph(graphData)

            assert.deepEqual(graph.checkIntegrity(), true)
        })
    })
})
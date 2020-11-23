import Graph from "./dataStructures/graph"
import { retrievePath } from "./utils"

/**
 * The Bellman–Ford algorithm is an algorithm to find shortest paths
 * of a directed graph. In this implementation the algorithm detects
 * and returns negative cycles.
 * Time complexity: O(n * m).
 * @param {Graph} Graph to visit.
 * @param {number} Source node.
 * @returns {number[] | undefined} Path of the negative cycle.
 */
export function bellmanFord(graph: Graph, sourceNodeId: number): number[] | undefined {
    const distances = new Map<number, number>()
    const predecessors = new Map<number, number>()

    const nodes = graph.getNodes()

    for (const node of nodes) {
        distances.set(node.id, Infinity)
    }

    distances.set(sourceNodeId, 0)

    for (let i = 0; i < graph.size() - 1; i++) {
        for (const node of nodes) {
            const arcs = node.getArcs()

            for (const arc of arcs) {
                const nodeDistance = distances.get(node.id) as number
                const adjacentNodeDistance = distances.get(arc.head) as number

                if (adjacentNodeDistance > nodeDistance + arc.cost) {
                    distances.set(arc.head, nodeDistance + arc.cost)
                    predecessors.set(arc.head, node.id)
                }
            }
        }
    }

    for (const node of nodes) {
        const arcs = node.getArcs()

        for (const arc of arcs) {
            const nodeDistance = distances.get(node.id) as number
            const adjacentNodeDistance = distances.get(arc.head) as number

            if (adjacentNodeDistance > nodeDistance + arc.cost) {
                return retrievePath(predecessors, arc.head, node.id)
            }
        }
    }
}
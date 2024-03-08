class Graph {
    constructor(vertexCount = 0) {
        this.adjacencyList = new Map();
        this.isDirected = false;
        // Initialize with a given number of vertices
        for (let i = 0; i < vertexCount; i++) {
            this.addVertex(i);
        }
    }

    setDirected(isDirected) {
        this.isDirected = isDirected;
    }

    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(source, destination) {
        if (!this.adjacencyList.has(source)) {
            this.addVertex(source);
        }
        if (!this.adjacencyList.has(destination)) {
            this.addVertex(destination);
        }
        this.adjacencyList.get(source).push(destination);

        // For an undirected graph, add the reverse edge
        if (!this.isDirected) {
            this.adjacencyList.get(destination).push(source);
        }
    }

    dfs(startVertex, visitFn) {
        const visited = new Map();
        for (let [vertex, _] of this.adjacencyList) {
            visited.set(vertex, false);
        }
        this.dfsUtil(startVertex, visited, visitFn);
    }

    dfsUtil(vertex, visited, visitFn) {
        visited.set(vertex, true);
        if (visitFn) {
            visitFn(vertex);
        }
        const neighbors = this.adjacencyList.get(vertex);
        for (let neighbor of neighbors) {
            if (!visited.get(neighbor)) {
                this.dfsUtil(neighbor, visited, visitFn);
            }
        }
    }

    bfs(startVertex, visitFn) {
        const visited = new Map();
        const queue = [];
        visited.set(startVertex, true);
        queue.push(startVertex);

        while (queue.length) {
            const vertex = queue.shift();
            if (visitFn) {
                visitFn(vertex);
            }
            const neighbors = this.adjacencyList.get(vertex);
            for (let neighbor of neighbors) {
                if (!visited.get(neighbor)) {
                    visited.set(neighbor, true);
                    queue.push(neighbor);
                }
            }
        }
    }

    topSort() {
        if (!this.isDirected) {
            throw new Error("Topological sort is only applicable to directed graphs.");
        }

        const stack = [];
        const visited = new Map();
        for (let [vertex, _] of this.adjacencyList) {
            visited.set(vertex, false);
        }

        for (let [vertex, _] of this.adjacencyList) {
            if (!visited.get(vertex)) {
                this.topSortUtil(vertex, visited, stack);
            }
        }

        const sorted = [];
        while (stack.length) {
            sorted.push(stack.pop());
        }
        return sorted;
    }

    topSortUtil(vertex, visited, stack) {
        visited.set(vertex, true);
        const neighbors = this.adjacencyList.get(vertex);
        for (let neighbor of neighbors) {
            if (!visited.get(neighbor)) {
                this.topSortUtil(neighbor, visited, stack);
            }
        }
        stack.push(vertex);
    }
}


import networkx as nx
import pickle
import os

class GraphBuilder:
    def __init__(self, use_neo4j=False):
        self.use_neo4j = use_neo4j
        if not use_neo4j:
            self.graph = nx.DiGraph()
            print("[Neural Web] Initialized Local NetworkX Graph.")
        else:
            print("[Neural Web] Connecting to Neo4j (Mock)...")
            # Neo4j connection logic would go here

    def ingest_atoms(self, atoms: list, source_id: str):
        """
        Maps atoms into the graph.
        """
        for atom in atoms:
            node_id = atom['id']
            # Create Node
            self.graph.add_node(node_id, 
                                content=atom['content'], 
                                source=source_id, 
                                type="Atom")
            
            # Create Edges based on tags (Mocking semantic relationships)
            for tag in atom['tags']:
                tag_node = f"Topic_{tag}"
                self.graph.add_node(tag_node, type="Topic")
                self.graph.add_edge(node_id, tag_node, relation="BELONGS_TO")
                
                # Link source to topic
                self.graph.add_edge(source_id, tag_node, relation="COVERS")

    def find_super_nodes(self):
        """
        Identifies high-degree nodes (Super Nodes).
        """
        degrees = dict(self.graph.degree())
        # Sort by degree
        sorted_nodes = sorted(degrees.items(), key=lambda item: item[1], reverse=True)
        return sorted_nodes[:5]

    def save_graph(self, path="knowledge_web.gpickle"):
        with open(path, 'wb') as f:
            pickle.dump(self.graph, f)
        print(f"[Neural Web] Graph snapshot saved to {path}")

    def get_related_nodes(self, topic):
        topic_node = f"Topic_{topic}"
        if topic_node in self.graph:
            return list(self.graph.neighbors(topic_node))
        return []

if __name__ == "__main__":
    gb = GraphBuilder()
    mock_atoms = [
        {"id": "a1", "content": "Shell and Tube implies Baffles", "tags": ["Shell", "Design"]},
        {"id": "a2", "content": "Design requires LMTD", "tags": ["Design", "LMTD"]}
    ]
    gb.graph.add_node("Exam_2024", type="Source")
    gb.ingest_atoms(mock_atoms, "Exam_2024")
    print("Super Nodes:", gb.find_super_nodes())

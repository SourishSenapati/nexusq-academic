
import random

class Agent:
    def __init__(self, name, persona):
        self.name = name
        self.persona = persona

    def reason(self, topic, context):
        raise NotImplementedError

class Historian(Agent):
    def reason(self, topic, context):
        # Look at frequency trends
        base_prob = random.uniform(0.3, 0.9)
        return {
            "agent": self.name,
            "verdict": f"Based on historical data, '{topic}' creates a recurring pattern.",
            "probability": base_prob,
            "weight": 1.0
        }

class Psychologist(Agent):
    def reason(self, topic, context):
        # Look at recent emphasis
        emphasis = random.choice([True, False])
        if emphasis:
            return {
                "agent": self.name,
                "verdict": f"The professor's recent fixation on '{topic}' suggests high likelihood.",
                "probability": 0.95,
                "weight": 1.5
            }
        else:
             return {
                "agent": self.name,
                "verdict": f"The professor ignored '{topic}' this semester.",
                "probability": 0.2,
                "weight": 1.5
            }

class Skeptic(Agent):
    def reason(self, topic, context):
        # Contrarian view
        return {
            "agent": self.name,
            "verdict": "Students expect this. It's too obvious. Expect a curveball.",
            "probability": 0.4,
            "weight": 0.8
        }

class SwarmJudge:
    def __init__(self):
        self.swarm = [
            Historian("Historian", "Pattern Recognition"),
            Psychologist("Psychologist", "Behavioral Analysis"),
            Skeptic("Skeptic", "Outlier Detection")
        ]

    def debate(self, topic, context=None):
        print(f"\n--- SWARM DEBATE INITIATED: TOPIC [{topic}] ---")
        arguments = []
        weighted_score_sum = 0
        total_weight = 0
        
        for agent in self.swarm:
            argument = agent.reason(topic, context)
            arguments.append(argument)
            
            w_score = argument['probability'] * argument['weight']
            weighted_score_sum += w_score
            total_weight += argument['weight']
            
            print(f"[{agent.name}]: {argument['verdict']} (Conf: {argument['probability']:.2f})")
            
        final_probability = weighted_score_sum / total_weight
        decision = "HIGH PROBABILITY" if final_probability > 0.6 else "LOW PROBABILITY"
        
        print(f"--- JUDGE RULING: {decision} ({final_probability:.2%}) ---\n")
        
        return {
            "topic": topic,
            "final_probability": final_probability,
            "reasoning_trace": arguments
        }

if __name__ == "__main__":
    judge = SwarmJudge()
    judge.debate("LMTD Correction Factor")

# Enterprise Knowledge Assistant

## Nodes

### Employee
- id
- name
- email
- designation

### Skill
- id
- name

### Project
- id
- name
- status

### Department
- id
- name

### Document
- id
- title
- url

---

## Relationships

(Employee)-[:KNOWS]->(Skill)

(Employee)-[:WORKS_ON]->(Project)

(Project)-[:USES]->(Skill)

(Employee)-[:BELONGS_TO]->(Department)

(Project)-[:HAS_DOCUMENT]->(Document)

(Document)-[:ABOUT]->(Skill)


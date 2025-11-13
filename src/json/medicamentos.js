const dadosMedicamento =  [
    {
        "id": 1, 
        "nome": "Paracetamol 500mg (20 comp.)",
        "preco": "R$ 8,90",
        "img": require('@/assets/paracetamol.jpg'), 
        "tipo": "Analgésicos",
        "descricao": "Analgésico e antitérmico de uso comum. Indicado para o alívio de dores leves a moderadas, como dor de cabeça, e para reduzir a febre.",
        "alertaAlergia": "Reações alérgicas (erupção cutânea, coceira) são raras, mas possíveis. Não exceder a dose máxima diária.",
        "receitaObrigatoria": false,
        "estoqueAtual": 500 
    },
    {
        "id": 2,
        "nome": "Vitamina C 1g (30 comp.)",
        "preco": "R$ 29,90",
        "img": require('@/assets/VitaminaC.jpg'),
        "tipo": "Vitaminas",
        "descricao": "Suplemento de vitamina C que auxilia no fortalecimento do sistema imunológico, absorção de ferro e tem ação antioxidante.",
        "alertaAlergia": "Pode causar desconforto gástrico em altas doses. Não exceder a dose recomendada sem orientação médica.",
        "receitaObrigatoria": false,
        "estoqueAtual": 500
    },
    {
        "id": 3,
        "nome": "Ibuprofeno 400mg (10 cáp.)",
        "preco": "R$ 15,45",
        "img": require('@/assets/Ibuprofeno.jpg'),
        "tipo": "Anti-inflamatórios",
        "descricao": "Medicamento com ação anti-inflamatória, analgésica e antitérmica. Alivia dores e combate inflamações.",
        "alertaAlergia": "Evitar em casos de úlcera gástrica ou problemas renais. Pode causar reações de hipersensibilidade.",
        "receitaObrigatoria": false,
        "estoqueAtual": 500
    },
    {
        "id": 4,
        "nome": "Pomada Cicatrizante 50g",
        "preco": "R$ 34,90",
        "img": require('@/assets/PomadaCicatrizante.jpg'),
        "tipo": "Dermatológicos",
        "descricao": "Pomada indicada para o tratamento de feridas leves, queimaduras e para acelerar o processo natural de cicatrização da pele.",
        "alertaAlergia": "Em caso de irritação ou vermelhidão excessiva, suspenda o uso e procure um médico.",
        "receitaObrigatoria": false,
        "estoqueAtual": 500
    },
    {
        "id": 5,
        "nome": "Chá Calmante Natural (20 sachês)",
        "preco": "R$ 19,90",
        "img": require('@/assets/ChaCalmanteNatural.jpg'),
        "tipo": "Fitoterápicos",
        "descricao": "Mistura de ervas naturais que ajudam a reduzir a ansiedade e promovem o relaxamento. Ideal para consumo antes de dormir.",
        "alertaAlergia": "Pode causar sonolência. Não recomendado para gestantes e lactantes sem orientação médica.",
        "receitaObrigatoria": false,
        "estoqueAtual": 500
    },
    {
        "id": 6,
        "nome": "Dorflex (10 comp.)",
        "preco": "R$ 12,99",
        "img": require('@/assets/Dorflex.jpg'),
        "tipo": "Analgésicos",
        "descricao": "Analgésico e relaxante muscular. Indicado para o alívio de dores de cabeça tensionais e dores musculares.",
        "alertaAlergia": "Pode causar tontura e reações alérgicas. O uso prolongado deve ser evitado.",
        "receitaObrigatoria": false,
        "estoqueAtual": 500
    },
    {
        "id": 7,
        "nome": "Polivitamínico AZ (60 comp.)",
        "preco": "R$ 49,99",
        "img": require('@/assets/Polivitaminico.jpg'),
        "tipo": "Vitaminas",
        "descricao": "Suplemento completo com vitaminas e minerais de A a Z. Auxilia na manutenção da saúde e energia diária.",
        "alertaAlergia": "Não existem alertas graves. Apenas manter fora do alcance de crianças e não exceder a dose.",
        "receitaObrigatoria": false,
        "estoqueAtual": 500
    },
    {
        "id": 8,
        "nome": "Creme Hidratante Pós-sol",
        "preco": "R$ 22,50",
        "img": require('@/assets/cremeHidratantePosSol.jpg'),
        "tipo": "Dermatológicos",
        "descricao": "Creme refrescante para aliviar a ardência e hidratar a pele após a exposição solar. Contém Aloe Vera.",
        "alertaAlergia": "Em raros casos pode haver hipersensibilidade a um dos componentes. Uso tópico.",
        "receitaObrigatoria": false,
        "estoqueAtual": 500
    },
    {
        "id": 9,
        "nome": "Aspirina 100mg (10 comp.)",
        "preco": "R$ 9,90",
        "img": require('@/assets/Aspirina.jpg'),
        "tipo": "Analgésicos",
        "descricao": "Ácido acetilsalicílico em baixa dosagem, usado para prevenir a formação de coágulos e tratar dores leves.",
        "alertaAlergia": "Pode irritar o estômago e causar sangramento. Contraindicado para crianças com sintomas gripais e pessoas com hemofilia.",
        "receitaObrigatoria": false,
        "estoqueAtual": 500
    },
    {
        "id": 10,
        "nome": "Melatonina 3mg (30 cáp.)",
        "preco": "R$ 55,00",
        "img": require('@/assets/Melatonina.jpg'),
        "tipo": "Fitoterápicos",
        "descricao": "Hormônio que regula o ciclo do sono. Auxilia na indução e melhoria da qualidade do sono em casos de insônia.",
        "alertaAlergia": "Pode causar sonolência diurna ou tonturas. Evitar dirigir ou operar máquinas após o uso.",
        "receitaObrigatoria": false,
        "estoqueAtual": 500
    },
    {
        "id": 11,
        "nome": "Amoxicilina 500mg (21 comp.)",
        "preco": "R$ 38,00",
        "img": require('@/assets/Amoxicilina.jpg'),
        "tipo": "Anti-inflamatórios",
        "descricao": "Antibiótico de amplo espectro, utilizado no tratamento de diversas infecções bacterianas. Requer diagnóstico médico.",
        "alertaAlergia": "Risco de reações alérgicas graves (choque anafilático) em pacientes sensíveis à penicilina. Uso restrito à prescrição.",
        "receitaObrigatoria": true,
        "estoqueAtual": 500
    },
    {
        "id": 12,
        "nome": "Probiótico Ativo (10 cáp.)",
        "preco": "R$ 68,00",
        "img": require('@/assets/probioticoAtivo.jpg'),
        "tipo": "Vitaminas",
        "descricao": "Suplemento com culturas ativas de bactérias benéficas para equilibrar a flora intestinal e melhorar a digestão.",
        "alertaAlergia": "Geralmente seguro. Em casos raros pode causar inchaço ou gases leves no início do tratamento.",
        "receitaObrigatoria": false,
        "estoqueAtual": 500
    }
]
export default dadosMedicamento;
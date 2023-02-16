### Question à un point :
Selon ChatGPT:

Selon l'analyse du texte fourni, la faille potentielle de l'API est qu'il est possible d'insérer une valeur qui n'est pas autorisée pour une donnée en base de données. Plus précisément, la donnée concernée est le pseudo et la classe du personnage de World of Warcraft.

En effet, il est mentionné que "deux persos ne peuvent pas avoir le même pseudo / classe". Cela suggère que le pseudo et la classe du personnage sont utilisés comme clés uniques dans la base de données pour éviter les doublons. Cependant, il n'est pas clair si l'API effectue une vérification pour s'assurer que le pseudo et la classe du personnage sont des valeurs autorisées.

Ainsi, un utilisateur malveillant pourrait potentiellement insérer des valeurs non autorisées pour le pseudo ou la classe du personnage, ce qui pourrait entraîner des erreurs de données ou compromettre la sécurité de l'application.

Pour résoudre cette faille, l'API devrait inclure des vérifications pour s'assurer que seules les valeurs autorisées pour le pseudo et la classe du personnage sont insérées dans la base de données. Par exemple, cela pourrait être réalisé en utilisant des listes prédéfinies de noms de personnages et de classes valides pour s'assurer que seules les valeurs autorisées sont acceptées par l'API.
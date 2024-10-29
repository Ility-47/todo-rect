export function sortTasks(tasks) {
    return tasks.sort((a, b) => {
        // Сравниваем дни
        if (a.day !== b.day) {
            return a.day - b.day; // Сортировка по возрастанию дня
        }
        
        // Если дни равны, сравниваем время
        const timeA = a.__time.split(':').map(Number);
        const timeB = b.__time.split(':').map(Number);
        
        // Сравниваем часы
        if (timeA[0] !== timeB[0]) {
            return timeA[0] - timeB[0]; // Сортировка по часам
        }
        
        // Сравниваем минуты
        if (timeA[1] !== timeB[1]) {
            return timeA[1] - timeB[1]; // Сортировка по минутам
        }
        
        // Сравниваем секунды
        return timeA[2] - timeB[2]; // Сортировка по секундам
    });
}

const BucketItem = (itemName, dueDate, isComplete, completionDate) => {
    dueDate = dueDate?.toISOString();
    completionDate = completionDate?.toISOString();
    return(
        {
            "itemName": itemName,
            "dueDate": dueDate,
            "isComplete": isComplete,
            "completionDate": completionDate
        }
    );
};

export default BucketItem;
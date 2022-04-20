pragma solidity >=0.6.0 <0.8.0;


/**
 * @title Simple smart contract
 **/
contract FETestTask {
    // some intenal identifier
    uint internal intenalId = 1;
    // citizen notes
    mapping(uint=>string) citizensNotes;

    /**
     * @notice Write some info to the log
     **/
    event Citizen(uint indexed id, uint indexed age, string indexed city, string name);

    /**
     * @notice Some basic initialization
      **/
    constructor() public {
        addCitizen(32, "Abu Dhabi", "John", "Some of John's notes");
        addCitizen(22, "Dubai", "Ali", "Some of Ali's notes");
        addCitizen(56, "Dubai", "Jessica", "Some of Jessica's notes");
        addCitizen(44, "Dubai", "James", "Some of Jessica's notes");
        addCitizen(41, "Abu Dhabi", "Alla", "Some of Alla's notes");
        addCitizen(18, "Abu Dhabi", "Patrick", "Some of Patrick's notes");
        addCitizen(18, "Ajman", "Bob", "Some of Bob's notes");
        addCitizen(33, "Ajman", "Alice", "Some of Alice's notes");
        addCitizen(42, "Ras Al Khaimah", "Dan", "Some of Dan's notes");
        addCitizen(20, "Sharjah", "Tim", "Some of Tim's notes");
    }

    /**
     * @notice Add new citizen to the list
      **/
    function addCitizen(
        uint age,
        string memory city,
        string memory name,
        string memory someNote
    )
    public
    {
        require(age >= 18 && age < 150, "Only adults can be added to the list");
        require(bytes(name).length > 0, "Name can't be empty");
        require(bytes(city).length > 0, "City can't be empty");
        require(bytes(someNote).length > 0, "Notes about citizen are required");

        citizensNotes[intenalId] = someNote;

        emit Citizen(
            intenalId++,
            age,
            city,
            name
        );
    }

    /**
     * @notice Returns someNote
     **/
    function getNoteByCitizenId(uint id) external view returns (string memory) {
        require(bytes(citizensNotes[id]).length > 0, "Citizen not found");

        return citizensNotes[id];
    }
}
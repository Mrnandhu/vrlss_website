import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Users,
  X,
} from 'lucide-react'
import './TableBooking.css'

const diningTables = [
  { id: 'T01', seats: 2, shape: 'round', status: 'available' },
  { id: 'T02', seats: 4, shape: 'square', status: 'available' },
  { id: 'T03', seats: 6, shape: 'large', status: 'available' },
  { id: 'T04', seats: 4, shape: 'square', status: 'unavailable' },
  { id: 'T05', seats: 2, shape: 'round', status: 'available' },

  { id: 'T06', seats: 4, shape: 'square', status: 'available' },
  { id: 'T07', seats: 6, shape: 'large', status: 'available' },
  { id: 'T08', seats: 8, shape: 'large', status: 'available' },
  { id: 'T09', seats: 10, shape: 'large-wide', status: 'available' },
  { id: 'T10', seats: 2, shape: 'round', status: 'available' },

  { id: 'T11', seats: 2, shape: 'round', status: 'unavailable' },
  { id: 'T12', seats: 4, shape: 'square', status: 'available' },
  { id: 'T13', seats: 6, shape: 'large', status: 'available' },
  { id: 'T14', seats: 8, shape: 'large', status: 'available' },
  { id: 'T15', seats: 10, shape: 'large-wide', status: 'available' },
]

const privateRooms = [
  { id: 'PR1', seats: 4, status: 'available' },
  { id: 'PR2', seats: 6, status: 'available' },
  { id: 'PR3', seats: 8, status: 'available' },
  { id: 'PR4', seats: 10, status: 'unavailable' },
]

const partyHall = {
  id: 'MPH',
  min: 10,
  max: 20,
}

const times = [
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
]

function TableBooking() {
  const [selected, setSelected] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [selectedHall, setSelectedHall] = useState(false)
  const [date, setDate] = useState('2026-09-02')
  const [time, setTime] = useState('7:30 PM')
  const [guests, setGuests] = useState(6)
  const [view, setView] = useState('all')

  const selectedTables = useMemo(
    () =>
      diningTables.filter((table) =>
        selected.includes(table.id),
      ),
    [selected],
  )

  const tableCapacity = selectedTables.reduce(
    (total, table) => total + table.seats,
    0,
  )

  const roomCapacity = selectedRoom
    ? privateRooms.find((room) => room.id === selectedRoom)?.seats || 0
    : 0

  const totalCapacity =
    selectedHall
      ? partyHall.max
      : roomCapacity || tableCapacity

  const selectedCount =
    selected.length + (selectedRoom ? 1 : 0) + (selectedHall ? 1 : 0)

  const toggleTable = (table) => {
    if (table.status !== 'available') return

    setSelectedRoom(null)
    setSelectedHall(false)

    setSelected((current) =>
      current.includes(table.id)
        ? current.filter((id) => id !== table.id)
        : [...current, table.id],
    )
  }

  const selectRoom = (room) => {
    if (room.status !== 'available') return

    setSelected([])
    setSelectedHall(false)
    setSelectedRoom((current) =>
      current === room.id ? null : room.id,
    )
  }

  const selectHall = () => {
    setSelected([])
    setSelectedRoom(null)
    setSelectedHall((current) => !current)
  }

  const clearSelection = () => {
    setSelected([])
    setSelectedRoom(null)
    setSelectedHall(false)
  }

  const canContinue =
    selectedCount > 0 &&
    guests > 0 &&
    guests <= totalCapacity

  const continueBooking = () => {
    if (!canContinue) return

    const selection = selectedHall
      ? 'MPH'
      : selectedRoom
        ? selectedRoom
        : selected.join(',')

    window.location.href =
      `/demos/restaurant/booking?type=table&step=details` +
      `&selection=${encodeURIComponent(selection)}` +
      `&guests=${guests}` +
      `&date=${encodeURIComponent(date)}` +
      `&time=${encodeURIComponent(time)}`
  }

  const visibleTables =
    view === 'tables' || view === 'all'
      ? diningTables
      : []

  return (
    <div className="table-booking">
      <header className="table-booking-header">
        <button
          type="button"
          className="table-back"
          onClick={() => {
            window.location.href =
              '/demos/restaurant/booking?type=table'
          }}
        >
          <ArrowLeft size={17} />
          <span>Back to reservation</span>
        </button>

        <div className="table-brand">
          <span className="table-brand-mark">E</span>
          <span>
            <strong>EMBER &amp; LEAF</strong>
            <small>RESTAURANT CONCEPT</small>
          </span>
        </div>

        <span className="table-step">
          STEP 01 / TABLE SELECTION
        </span>
      </header>

      <main className="table-booking-main">
        <section className="table-booking-heading">
          <div>
            <span className="table-eyebrow">
              TABLE RESERVATION
            </span>

            <h1>Choose your table.</h1>

            <p>
              Select one or more available tables. You can also
              book a private room or our mini party hall.
            </p>
          </div>

          <div className="table-legend">
            <span>
              <i className="legend-dot available" />
              Available
            </span>

            <span>
              <i className="legend-dot selected" />
              Selected
            </span>

            <span>
              <i className="legend-dot unavailable" />
              Unavailable
            </span>
          </div>
        </section>

        <div className="table-booking-grid">
          <section className="restaurant-floorplan">
            <div className="floorplan-tabs">
              <button
                type="button"
                className={view === 'all' ? 'active' : ''}
                onClick={() => setView('all')}
              >
                All
              </button>

              <button
                type="button"
                className={view === 'tables' ? 'active' : ''}
                onClick={() => setView('tables')}
              >
                Dining Tables
              </button>

              <button
                type="button"
                className={view === 'rooms' ? 'active' : ''}
                onClick={() => setView('rooms')}
              >
                Private Rooms
              </button>

              <button
                type="button"
                className={view === 'party' ? 'active' : ''}
                onClick={() => setView('party')}
              >
                Party Hall
              </button>
            </div>

            <div className="floorplan">
              {(view === 'all' || view === 'rooms') && (
                <section className="private-zone">
                  <div className="zone-title">
                    PRIVATE ROOMS
                  </div>

                  <div className="private-room-grid">
                    {privateRooms.map((room) => {
                      const isSelected =
                        selectedRoom === room.id

                      return (
                        <button
                          type="button"
                          key={room.id}
                          className={[
                            'private-room',
                            room.status === 'unavailable'
                              ? 'is-unavailable'
                              : '',
                            isSelected ? 'is-selected' : '',
                          ].join(' ')}
                          onClick={() => selectRoom(room)}
                          disabled={
                            room.status === 'unavailable'
                          }
                        >
                          <span className="room-label">
                            {room.id}
                          </span>

                          <strong>{room.seats}</strong>
                          <small>seats</small>

                          {isSelected && (
                            <span className="selected-check">
                              <Check size={12} />
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </section>
              )}

              {(view === 'all' || view === 'party') && (
                <section className="party-zone">
                  <div className="zone-title">
                    MINI PARTY HALL
                  </div>

                  <button
                    type="button"
                    className={[
                      'party-hall',
                      selectedHall ? 'is-selected' : '',
                    ].join(' ')}
                    onClick={selectHall}
                  >
                    <span>MPH</span>
                    <strong>10–20</strong>
                    <small>guests</small>

                    {selectedHall && (
                      <span className="selected-check">
                        <Check size={12} />
                      </span>
                    )}
                  </button>
                </section>
              )}

              {(view === 'all' || view === 'tables') && (
                <section className="main-dining-zone">
                  <div className="zone-title">
                    MAIN DINING AREA
                  </div>

                  <div className="dining-layout">
                    {visibleTables.map((table) => {
                      const isSelected =
                        selected.includes(table.id)

                      return (
                        <button
                          type="button"
                          key={table.id}
                          className={[
                            'dining-table',
                            `shape-${table.shape}`,
                            table.status === 'unavailable'
                              ? 'is-unavailable'
                              : '',
                            isSelected ? 'is-selected' : '',
                          ].join(' ')}
                          onClick={() =>
                            toggleTable(table)
                          }
                          disabled={
                            table.status === 'unavailable'
                          }
                          aria-label={`${table.id}, ${table.seats} seats`}
                        >
                          <strong>{table.id}</strong>
                          <small>
                            {table.seats} seats
                          </small>

                          {isSelected && (
                            <span className="selected-check">
                              <Check size={12} />
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </section>
              )}

              <div className="reception-zone">
                <span>HOST / RECEPTION</span>
              </div>

              <div className="lounge-zone">
                <span>LOUNGE</span>
                <div className="lounge-seat" />
                <div className="lounge-seat" />
              </div>

              <div className="entrance-zone">
                ENTRANCE
              </div>
            </div>
          </section>

          <aside className="booking-sidebar">
            <div className="selection-card">
              <div className="selection-card-header">
                <span>SELECTED</span>

                <button
                  type="button"
                  onClick={clearSelection}
                  disabled={selectedCount === 0}
                >
                  Clear all
                </button>
              </div>

              {selectedCount === 0 ? (
                <div className="empty-selection">
                  <Users size={24} />
                  <p>
                    Select a table, private room or party
                    hall from the layout.
                  </p>
                </div>
              ) : (
                <div className="selected-items">
                  {selectedTables.map((table) => (
                    <div
                      className="selected-item"
                      key={table.id}
                    >
                      <span className="selected-item-dot" />
                      <strong>{table.id}</strong>
                      <span>{table.seats} seats</span>

                      <button
                        type="button"
                        onClick={() =>
                          toggleTable(table)
                        }
                        aria-label={`Remove ${table.id}`}
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ))}

                  {selectedRoom && (
                    <div className="selected-item">
                      <span className="selected-item-dot" />
                      <strong>{selectedRoom}</strong>
                      <span>
                        {roomCapacity} seats
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedRoom(null)
                        }
                        aria-label="Remove private room"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  )}

                  {selectedHall && (
                    <div className="selected-item">
                      <span className="selected-item-dot" />
                      <strong>MPH</strong>
                      <span>10–20 guests</span>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedHall(false)
                        }
                        aria-label="Remove party hall"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="capacity-row">
                <span>Total capacity</span>
                <strong>
                  <Users size={17} />
                  {totalCapacity || 0} seats
                </strong>
              </div>
            </div>

            <div className="booking-controls">
              <label>
                <span>
                  <CalendarDays size={16} />
                  DATE
                </span>

                <div className="control-field">
                  <input
                    type="date"
                    value={date}
                    min="2026-01-01"
                    onChange={(event) =>
                      setDate(event.target.value)
                    }
                  />
                </div>
              </label>

              <label>
                <span>
                  <Clock3 size={16} />
                  TIME
                </span>

                <div className="control-field select-field">
                  <select
                    value={time}
                    onChange={(event) =>
                      setTime(event.target.value)
                    }
                  >
                    {times.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>

                  <ChevronDown size={16} />
                </div>
              </label>

              <label>
                <span>
                  <Users size={16} />
                  GUESTS
                </span>

                <div className="control-field select-field">
                  <select
                    value={guests}
                    onChange={(event) =>
                      setGuests(Number(event.target.value))
                    }
                  >
                    {Array.from(
                      { length: 20 },
                      (_, index) => index + 1,
                    ).map((number) => (
                      <option
                        key={number}
                        value={number}
                      >
                        {number} guest
                        {number > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>

                  <ChevronDown size={16} />
                </div>

                {totalCapacity > 0 &&
                  guests > totalCapacity && (
                    <small className="field-error">
                      Guest count exceeds the selected
                      capacity.
                    </small>
                  )}
              </label>

              <button
                type="button"
                className="booking-continue"
                disabled={!canContinue}
                onClick={continueBooking}
              >
                Continue
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="booking-quick-info">
              <span>QUICK INFO</span>

              <p>
                <Users size={16} />
                Combine multiple tables for larger
                groups.
              </p>

              <p>
                <span className="quick-icon">□</span>
                Private rooms: 4, 6, 8 and 10 seats.
              </p>

              <p>
                <Users size={16} />
                Mini party hall: 10–20 guests.
              </p>

              <p>
                <Clock3 size={16} />
                This is a VRLS demo booking flow. No real
                reservation will be created.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="table-booking-footer">
        <div>
          <strong>EMBER &amp; LEAF</strong>
          <small>RESTAURANT CONCEPT</small>
        </div>

        <span>
          Restaurant website concept by VRLS Solutions
        </span>
      </footer>
    </div>
  )
}

export default TableBooking
